/**
 * description:异步并发,最大并发数量为maxCount,不适用接口有先后依赖关系接口的情况
 * @param maxCount
 */
type TaskListItemType = {
    fn: () => Promise<void>;
    resolve: () => void;
    reject: () => void;
};

// type SucessResultType = {
//     code: number;
//     data: any;
// };

// type FailResultType = {
//     code: number;
//     message: string;
// };

// type RequestResultType = SucessResultType | FailResultType;

type InitTaskListType = (() => Promise<void>)[];

class AsyncBatchHttp {
    maxCount: number;
    private progressTaskNum: number;
    private taskList: TaskListItemType[];
    initList: InitTaskListType;
    constructor(initList, maxCount = 2) {
        this.maxCount = maxCount; // 异步并发任务数量
        this.initList = initList; // 初始化任务队列
        this.progressTaskNum = 0; // 进行中的任务数量
        this.taskList = [];
    }
    getResponse() {
        const responseList = [];
        return new Promise((resolve) => {
            if (this.initList.length > 0) {
                for (let index = 0; index < this.initList.length; index++) {
                    const fn = this.initList[index];
                    this.addTask(fn).then((res) => {
                        responseList.push(res);
                        if (responseList.length === this.initList.length) {
                            resolve(responseList);
                        }
                    });
                }
            }
        });
    }
    addTask(fn: () => Promise<void>): Promise<void> {
        return new Promise((resolve, reject) => {
            const storeFn: TaskListItemType = {
                fn,
                resolve,
                reject,
            };
            this.taskList.push(storeFn);
            this.runTask();
        });
    }
    runTask() {
        if (this.taskList.length > 0 && this.progressTaskNum < this.maxCount) {
            const { resolve, reject, fn } = this.taskList.shift();
            this.progressTaskNum++;
            return fn()
                .then(resolve, reject)
                .finally(() => {
                    this.progressTaskNum--;
                    // 递归调用下一个队列任务
                    this.runTask();
                });
        }
    }
    cancelHttp() {
        this.taskList = [];
        this.progressTaskNum = 0;
    }
}

export default AsyncBatchHttp;
