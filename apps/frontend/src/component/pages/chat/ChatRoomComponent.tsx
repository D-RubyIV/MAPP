import React, { Fragment, Suspense, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { AddReactionOutlined, CloseOutlined, UploadFileOutlined } from '@mui/icons-material';
import { useAppContext } from '../../../store/AppContext';

const ChatRoom: React.FC = () => {
  const { isOpenChat, setIsOpenChat, setIsConnectWebsocket, isConnectWebsocket } = useAppContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString) : null;
    const accessToken = token ? token.accessToken : "";

    console.log(accessToken);

    if (accessToken) {
      const client = new Client({
        brokerURL: `${import.meta.env.VITE_SERVERURL}/api/ws`,
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.onConnect = function (frame) {
        console.log("Connected !!!" + frame.body);
        setIsConnectWebsocket(true)
      };

      client.onStompError = function (frame) {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      };

      client.activate();
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <Fragment>
      <Suspense>
        <div className={`z-10 min-h-screen bg-indigo-400 bg-opacity-25 w-full fixed h-screen left-0 transition-all duration-500 ${isOpenChat ? "block bottom-0" : "-bottom-full"}`}>
          <div className='bg-white w-full h-full px-8 py-4 md:px-10 xl:px-20 flex flex-col'>
            <div className='py-2 flex justify-between items-center'>
              <div className='flex gap-2'>
                <div className='flex items-center'>
                  <img className='w-[32px] aspect-square object-cover rounded-full border-black border' src='https://th.bing.com/th/id/OIP.C-CcTNtfhJ2WSf524szKLgHaHa?pid=ImgDet&w=205&h=205&c=7' alt='Nhân viên hỗ trợ'></img>
                </div>
                <div className='text-[12.5px]'>
                  <div className='font-semibold text-gray-700 text-[13.5px]'>
                    <span>Nhân viên hỗ trợ</span>
                    <span className='ml-1 text-[10px]'>{isConnectWebsocket ? "🟢" : "🔴"}</span>
                  </div>
                  <p className='font-thin'>Hoạt động 12 phút trước</p>
                </div>
              </div>
              <div>
                <button onClick={() => setIsOpenChat(false)} className='items-center flex'><CloseOutlined /></button>
              </div>
            </div>
            <div className='h-full justify-between flex flex-col'>
              <div>
                ss
              </div>
              <div className='bg-white border-t-2 border-b-2 border-dotted border-gray-300'>
                <div className='flex justify-around w-full items-end py-2'>
                  <div><button><UploadFileOutlined /></button></div>
                  <div>
                    <textarea
                      ref={textareaRef}
                      className='text-sm focus:outline-none min-w-64 resize-none overflow-hidden'
                      placeholder='Gửi tin nhắn ...'
                      onInput={handleInput}
                      rows={1}
                    ></textarea>
                  </div>
                  <div><button><AddReactionOutlined /></button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Fragment>
  );
};

export default ChatRoom;
