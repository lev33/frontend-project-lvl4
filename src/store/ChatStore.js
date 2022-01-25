import { makeAutoObservable } from 'mobx';

export default class ChatStore {
  constructor() {
    this._channels = [];
    this._messages = [];
    this._currentChannelId = 0;
    makeAutoObservable(this);
  }

  setChannels(channels) {
    this._channels = channels;
  }

  setMessages(messages) {
    this._messages = messages;
  }

  setCurrentChannelId(currentChannelId) {
    this._currentChannelId = currentChannelId;
  }

  addMessage(message) {
    this._messages.push(message);
  }

  get channels() {
    return this._channels;
  }

  get messages() {
    return this._messages;
  }

  get currentChannelId() {
    return this._currentChannelId;
  }
}
