import { makeAutoObservable } from 'mobx';

const chat = makeAutoObservable({
  channels: [],
  messages: [],
  currentChannelId: 0,

  setChannels: (channels) => { chat.channels = channels; },

  setMessages: (messages) => { chat.messages = messages; },

  setCurrentChannelId: (currentChannelId) => { chat.currentChannelId = currentChannelId; },

  addChannel: (channel) => { chat.channels.push(channel); },

  addMessage: (message) => { chat.messages.push(message); },

  setChannelName: (id, name) => {
    chat.channels = chat.channels.map((el) => (el.id === id ? { ...el, name } : el));
  },

  removeChannel: (id) => {
    chat.channels = chat.channels.filter((el) => el.id !== id);
    chat.messages = chat.messages.filter((el) => el.channelId !== id);
  },
});

export default chat;
