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

  addChannel(channel) {
    this._channels.push(channel);
  }

  addMessage(message) {
    this._messages.push(message);
  }

  setChannelName(id, name) {
    this._channels = this._channels.map((el) => (el.id === id ? { ...el, name } : el));
  }

  removeChannel(id) {
    this._channels = this._channels.filter((el) => el.id !== id);
    this._messages = this._messages.filter((el) => el.channelId !== id);
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
