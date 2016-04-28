"use strict";

//----------------------------------------------------------------------------//
// Constants                                                                  //
//----------------------------------------------------------------------------//

const Robot   = require ("robot-js" );
const Offsets = require ("./offsets");

// Shortcuts to Robot classes
const Process = Robot.Process;
const Module  = Robot.Module;
const Memory  = Robot.Memory;
const Window  = Robot.Window;



//----------------------------------------------------------------------------//
// Export                                                                     //
//----------------------------------------------------------------------------//

module.exports = class
{
    ////////////////////////////////////////////////////////////////////////////////
    /// Creates a new unselected game instance object

    constructor() { this.deselect(); }

    ////////////////////////////////////////////////////////////////////////////////
    /// Deselects any currently selected game instance

    deselect()
    {
        this._window  = null;       // The game window

        this._process = null;       // The game process
        this._is64Bit = false;      // If game is 64Bit

        this._memory  = null;       // The game memory
        this._module  = null;       // Main module addr

        this._offsets = null;       // Correct offsets
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// Selects a game instance using the specified process

    selectByProcess (process)
    {
        // Check if arguments are correct
        if (!(process instanceof Process))
            throw new TypeError ("Invalid arguments");

        // Attempt to select the main window
        let window = process.getWindows()[0];

        return window &&
            // Perform window selection
            this.selectByWindow (window);
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// Selects a game instance using the specified window

    selectByWindow (window)
    {
        // Check if arguments are correct
        if (!(window instanceof Window))
            throw new TypeError ("Invalid arguments");

        // Check if the window title correctly matches
        if (window.getTitle() !== "World of Warcraft")
            return false;

        let process = window.getProcess();
        // Ensure that the process was opened
        if (!process.isValid()) return false;

        let module =
            // Get the main executable module
            process.getModules (".*\.exe")[0];
        if (!module) return false;
        module = module.getBase();

        // Determine if game is 64Bit
        let is64Bit = process.is64Bit();
        let offsets = is64Bit ?
            // Make sure to select correct offsets
            Offsets.Offsets64 : Offsets.Offsets32;

        // Create a new memory object
        let memory = Memory (process);
        if (memory.readString
            // Ensure game build is supported
            (module + offsets.GameBuild, 6) !==
            Offsets.GameBuild) return false;

        this._window  = window;
        this._process = process;
        this._is64Bit = is64Bit;
        this._memory  = memory;
        this._module  = module;
        this._offsets = offsets;

        // Create the memory cache
        this._memory.createCache
            (16384, 4096, 10485760);

        return true;
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// Selects a game instance by scanning all open processes

    selectByFindProcess()
    {
        for (let p of Process.getList ("Wow.*\.exe"))
        {
            // Select the first suitable process value
            if (this.selectByProcess (p)) return true;
        }

        return false;
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// Selects a game instance by scanning all open windows

    selectByFindWindow()
    {
        for (let w of Window.getList ("World of Warcraft"))
        {
            // Select the first suitable window value
            if (this.selectByWindow (w)) return true;
        }

        return false;
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// Selects a game instance using the current active window

    selectByActiveWindow()
    {
        // Attempt to select the current active window
        return this.selectByWindow (Window.getActive());
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// Returns true if a game instance is currently selected

    isSelected()
    {
        return this._window !== null;
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// Returns true if the selected game instance is running

    isRunning()
    {
        // Ensure a game window is selected
        if (!this.isSelected()) return false;

        return !this._process.hasExited() &&
                this._window .isValid  ();
    }

    ////////////////////////////////////////////////////////////////////////////////
    /// Various properties to extract game instance information

    get window () { return this._window;  }

    get process() { return this._process; }
    get is64Bit() { return this._is64Bit; }

    get memory () { return this._memory;  }
    get module () { return this._module;  }

    get offsets() { return this._offsets; }
};
