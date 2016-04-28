"use strict";

//----------------------------------------------------------------------------//
// Chat Monitor                                                               //
//----------------------------------------------------------------------------//

// Old chat position
let position = null;
// Used to retrieve player guid
let guidBuff = new Buffer (16);

const io = require('socket.io')(80);

// Create application controller
new (require ("../source/app_controller"))
    (250, function (gameInstance)
{
    // Some shortcuts to update the game
    const memory  = gameInstance.memory;
    const module  = gameInstance.module;
    const offsets = gameInstance.offsets;

    // Read the new position of the chat
    const newPosition = memory.readInt32
        (module + offsets.Chat.Position);

    // Make sure the position is reasonable
    if (newPosition < 0 || newPosition > 60)
        return;

    if (position === null)
    {
        // First time this is being run
        position = newPosition; return;
    }

    let newMessages = [ ];
    // Read any new incoming messages
    while (position !== newPosition)
    {
        if (++position === 60) position = 0;
        // Get the current message offset in memory
        const slide = module + offsets.Chat.TableBase +
            (offsets.Chat.EntrySize * (position - 1));

        newMessages.push
        ({
            senderGuid : memory.readData (slide + offsets.Chat.Entry.SenderGuid, guidBuff, 16) ?
                                          guidBuff.toString ("hex").toUpperCase() : "",

            senderName : memory.readString (slide + offsets.Chat.Entry.SenderName,  40  ),
            fullMessage: memory.readString (slide + offsets.Chat.Entry.FullMessage, 3000),
            onlyMessage: memory.readString (slide + offsets.Chat.Entry.OnlyMessage, 3000),

            channelNum : memory.readInt32  (slide + offsets.Chat.Entry.ChannelNum),
            timeStamp  : memory.readInt32  (slide + offsets.Chat.Entry.TimeStamp )
        });
    }

    io.on('connection', function (socket) {
      newMessages.map (message =>
      {
          // Convert the Unix timestamp into a normal Date
          const date = new Date (message.timeStamp * 1000);
          const hrs  = `0${date.getHours  ()}`.substr (-2);
          const min  = `0${date.getMinutes()}`.substr (-2);
          const sec  = `0${date.getSeconds()}`.substr (-2);
          const msg  = `[${hrs}:${min}:${sec}] [${message.senderName}]: ${message.onlyMessage}`;
          console.log('msg', msg);
          socket.emit('chat-message', msg);
      });
    });
});
