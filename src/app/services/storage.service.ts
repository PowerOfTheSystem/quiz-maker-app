export abstract class StorageService<T> {
  constructor(private readonly key: string) {}

  public getData(): T | null {
    let model = localStorage.getItem(this.key);
    return model ? JSON.parse(model) : null;
  }

  public saveData(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  public clearData() {
    localStorage.clear();
  }
}
