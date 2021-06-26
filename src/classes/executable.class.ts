export default abstract class Executable {
  protected readonly path: string;

  constructor(path: string) {
    this.path = path;
  }
}
