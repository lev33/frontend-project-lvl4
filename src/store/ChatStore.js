import { makeAutoObservable } from 'mobx';

const chatStore = makeAutoObservable({
  channels: [],
  messages: [],
  currentChannelId: 0,

  setChannels: (channels) => { chatStore.channels = channels; },

  setMessages: (messages) => { chatStore.messages = messages; },

  setCurrentChannelId: (currentChannelId) => { chatStore.currentChannelId = currentChannelId; },

  addChannel: (channel) => { chatStore.channels.push(channel); },

  addMessage: (message) => { chatStore.messages.push(message); },

  setChannelName: (id, name) => {
    chatStore.channels = chatStore.channels.map((el) => (el.id === id ? { ...el, name } : el));
  },

  removeChannel: (id) => {
    chatStore.channels = chatStore.channels.filter((el) => el.id !== id);
    chatStore.messages = chatStore.messages.filter((el) => el.channelId !== id);
  },
});

export default chatStore;
