
import { initializeSocketConnection } from "../service/chat.socket";

import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../service/chat.api";

import {
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
  createNewChat,
  addNewMessage,
  addMessages,
  deleteChatFromState,
} from "../chat.slice";

import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    dispatch(setLoading(true));

    const data = await sendMessage({
      message,
      chatId,
    });

    const { chat, aiMessage } = data;

    const activeChatId = chatId || chat._id;

    if (!chatId) {
      dispatch(
        createNewChat({
          chatId: chat._id,
          title: chat.title,
        }),
      );
    }

    dispatch(
      addNewMessage({
        chatId: activeChatId,
        content: message,
        role: "user",
      }),
    );

    dispatch(
      addNewMessage({
        chatId: activeChatId,
        content: aiMessage.content,
        role: aiMessage.role,
      }),
    );

    dispatch(setCurrentChatId(activeChatId));

    dispatch(setLoading(false));
  }

  async function handleGetChats() {
    dispatch(setLoading(true));

    const data = await getChats();

    const { chats } = data;

    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt,
          };

          return acc;
        }, {}),
      ),
    );

    dispatch(setLoading(false));
  }

  async function handleOpenChat(chatId, chats) {
    console.log(chats[chatId]?.messages.length);

    if (chats[chatId]?.messages.length === 0) {
      const data = await getMessages(chatId);

      const { messages } = data;

      const formattedMessages = messages.map((msg) => ({
        content: msg.content,
        role: msg.role,
      }));

      dispatch(
        addMessages({
          chatId,
          messages: formattedMessages,
        }),
      );
    }

    dispatch(setCurrentChatId(chatId));
  }

  async function handleDeleteChat(chatId) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await deleteChat(chatId);

      dispatch(deleteChatFromState(chatId));

      dispatch(setLoading(false));
    } catch (error) {
      console.error("Delete chat failed:", error);

      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to delete chat",
        ),
      );

      dispatch(setLoading(false));
    }
  }

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
  };
};
