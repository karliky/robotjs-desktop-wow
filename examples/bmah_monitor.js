"use strict";

//----------------------------------------------------------------------------//
// BMAH Monitor                                                               //
//----------------------------------------------------------------------------//

// Create application controller
new (require ("./app_controller"))
    (250, function (gameInstance)
{
    // Some shortcuts to update the game
    const memory  = gameInstance.memory;
    const module  = gameInstance.module;
    const offsets = gameInstance.offsets;

    // Read BMAH count and table
    const count = memory.readInt32 (module + offsets.BMAH.Count    );
    const table = memory.readPtr   (module + offsets.BMAH.TableBase);

    // Make sure count and table are valid
    if (count <= 0 || table <= 0) return;

    let items = [ ];
    // Loop through all BMAH items
    for (let i = 0; i < count; ++i)
    {
        // Retrieve the current BMAH item offset in memory
        const slide = table + (offsets.BMAH.EntrySize * i);

        items.push
        ({
            marketID  : memory.readInt32 (slide + offsets.BMAH.Entry.MarketID  ),
              itemID  : memory.readInt32 (slide + offsets.BMAH.Entry.  ItemID  ),
            minimumBid: memory.readInt64 (slide + offsets.BMAH.Entry.MinimumBid),
            maximumInc: memory.readInt64 (slide + offsets.BMAH.Entry.MaximumInc),
            currentBid: memory.readInt64 (slide + offsets.BMAH.Entry.CurrentBid),
            timeLeft  : memory.readInt32 (slide + offsets.BMAH.Entry.TimeLeft  ),
            bidCount  : memory.readInt32 (slide + offsets.BMAH.Entry.BidCount  )
        });
    }

    // Cheap way to clear the screen
    process.stdout.write ("\x1Bc");

    // Print each item
    items.map (item =>
    {
        // TIP: ItemID is an item so you can use the WowAPI
        // or WowHead to retrieve more information about it

        console.log (`Item=${item.itemID} Bid=${item.currentBid /
            10000} Bids=${item.bidCount} Time=${item.timeLeft}`);
    });
});
