import { observable } from 'mobx';

export class Conversations {
  constructor() {
    this.records = observable([]);
  }

  push({ content, by }) {
    this.records.push({ content, by, when: new Date() });
  }

  getLastRecord() {
    return this.records[this.records.length - 1];
  }

  getContents() {
    return this.records.map(({ content }) => content);
  }
}
