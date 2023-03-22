export class TaskItem {
  public constructor(
    public id: number,
    public task: string,
    public translate: string,
    public complete: boolean = false
  ) {}

  public printDetails() {
    console.log(
      `${this.id}\t${this.task}\t${this.translate} ${this.complete ? "\t(устгах)" : ""}`
    );
  }
}
