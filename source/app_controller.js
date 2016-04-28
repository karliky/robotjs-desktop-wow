"use strict";

//----------------------------------------------------------------------------//
// Constants                                                                  //
//----------------------------------------------------------------------------//

const GameInstance = require ("./game_instance");



//----------------------------------------------------------------------------//
// Export                                                                     //
//----------------------------------------------------------------------------//

module.exports = class
{
    ////////////////////////////////////////////////////////////////////////////////
    /// Creates a new application controller

    constructor (updateRate, updateFunc)
    {
        this._updateRate = updateRate;
        this._updateFunc = updateFunc;

        this._gameInstance = new GameInstance();
        console.log ("Select a WoW Window...");

        this._heartbeat();
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// Main event loop executed by the heartbeat

    _eventLoop()
    {
        // Waits for a game to get selected
        if (!this._gameInstance.isSelected())
        {
            this._gameInstance.selectByActiveWindow();
            return;
        }

        // Ensures the game is still running
        if (!this._gameInstance.isRunning())
        {
            console.log ("Select a WoW Window...");
            this._gameInstance.deselect(); return;
        }

        // Checks whether the player is in-game
        if (!this._gameInstance.memory.readBool
            (this._gameInstance.offsets.GameState +
             this._gameInstance.module)) return;

        // Call the specified update function
        this._updateFunc (this._gameInstance);

        // Don't forget to reset memory cache
        this._gameInstance.memory.clearCache();
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// Performs heartbeat and enqueues the next one

    _heartbeat()
    {
        this._eventLoop();
        setTimeout (() =>
            this._heartbeat(),
            this._updateRate);
    }
};
