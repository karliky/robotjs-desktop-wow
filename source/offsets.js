"use strict";

//----------------------------------------------------------------------------//
// Offsets                                                                    //
//----------------------------------------------------------------------------//

module.exports =
{
    GameBuild                       : "21463",

    Offsets32:
    {
        GameHash                    : 0xC7FEDA45,
        IconHash                    : 0xA118EC28,
        GameBuild                   : 0x9B24E4,
        GameState                   : 0xDA55B2,

        LocalPlayer                 : 0xD2E4C0,
        LocalCont                   : 0xBB3F7C,
        LocalZone                   : 0xBC0A64,
        IsLooting                   : 0xE165C8,
        IsTexting                   : 0xC1EB08,
         MouseGuid                  : 0xDA5988,
        TargetGuid                  : 0xDA59B8,

        Camera:
        {
            Struct                  : 0xDA5D58,
            Offset                  : 0x7610,
            Origin                  : 0x08,
            Matrix                  : 0x14,
            Fov                     : 0x38
        },

        Entity:
        {
            TableBase               : 0xC9D530,
            EntryFirst              : 0x0C,
            EntryNext               : 0x3C,

            Entry:
            {
                Type                : 0x0C,
                Descriptors         : 0x04,

                Desc:
                {
                    GlobalID        : 0x00,
                    EntityID        : 0x24,
                    DynFlags        : 0x28
                }
            },

            Unit:
            {
                Transport           : 0xAB0,
                Origin              : 0xAC0,
                Angle               : 0xAD0,
                Casting             : 0xF98,
                CastingStarted      : 0xFB0,
                CastingWillEnd      : 0xFB4,
                Channel             : 0xFB8,
                ChannelStarted      : 0xFBC,
                ChannelWillEnd      : 0xFC0,

                Aura:
                {
                    Count1          : 0x1588,
                    Count2          : 0x1108,
                    TableBase1      : 0x1108,
                    TableBase2      : 0x110C,
                    EntrySize       : 0x48,

                    Entry:
                    {
                        Owner       : 0x20,
                        SpellID     : 0x30,
                        Flags       : 0x38,
                        Stacks      : 0x39,
                        Level       : 0x3A,
                        EndTime     : 0x40
                    }
                },

                Desc:
                {
                    Creator         : 0x080,
                    Health          : 0x0F0,
                    Power           : 0x0F4,
                    HealthMax       : 0x10C,
                     PowerMax       : 0x110,
                    Level           : 0x158,
                    Flags           : 0x17C
                }
            },

            NPC:
            {
                Name1               : 0xC38,
                Name2               : 0x07C
            },

            Player:
            {
                Money1              : 0x190C,
                Money2              : 0x1890,
                Arch                : 0x1910,
                ArchCount           : 0x08,
                ArchSites           : 0x10,
                Target              : 0x41E8
            },

            Object:
            {
                Bobbing             : 0x104,
                Transport           : 0x130,
                Origin              : 0x140,
                Rotation            : 0x150,
                Transform           : 0x278,
                Name1               : 0x274,
                Name2               : 0x0B4,

                Desc:
                {
                    Creator         : 0x030,
                    Display         : 0x040
                }
            }
        },

        NameCache:
        {
            TableBase               : 0xC6043C,
            EntryNext               : 0x00,

            Entry:
            {
                Guid                : 0x10,
                Name                : 0x21,
                Race                : 0x70,
                Class               : 0x78
            }
        },

        Cooldown:
        {
            TableBase               : 0xC8AC88,
            EntryNext               : 0x04,

            Entry:
            {
                SpellID             : 0x08,
                 ItemID             : 0x0C,
                SpellStartTime      : 0x10,
                SpellDuration       : 0x14,
                GroupID             : 0x18,
                GroupStartTime      : 0x1C,
                GroupDuration       : 0x20,
                IsActive            : 0x24,
                GcdStartTime        : 0x28,
                GcdDuration         : 0x30
            }
        },

        BMAH:
        {
            Count                   : 0xE536D0,
            TableBase               : 0xE536D4,
            EntrySize               : 0x70,

            Entry:
            {
                MarketID            : 0x00,
                  ItemID            : 0x08,
                MinimumBid          : 0x48,
                MaximumInc          : 0x50,
                CurrentBid          : 0x58,
                TimeLeft            : 0x60,
                BidCount            : 0x68
            }
        },

        Chat:
        {
            Position                : 0xE01894,
            TableBase               : 0xDA7518,
            EntrySize               : 0x17E8,

            Entry:
            {
                SenderGuid          : 0x0000,
                SenderName          : 0x0034,
                FullMessage         : 0x0065,
                OnlyMessage         : 0x0C1D,
                ChannelNum          : 0x17D8,
                TimeStamp           : 0x17E4
            }
        }
    },

    Offsets64:
    {
        GameHash                    : 0x64C90819,
        IconHash                    : 0xA118EC28,
        GameBuild                   : 0x0F415FC,
        GameState                   : 0x1519A7E,

        LocalPlayer                 : 0x147E680,
        LocalCont                   : 0x124B40C,
        LocalZone                   : 0x125F694,
        IsLooting                   : 0x158D1A4,
        IsTexting                   : 0x12CD4B0,
         MouseGuid                  : 0x151A0B8,
        TargetGuid                  : 0x151A0E8,

        Camera:
        {
            Struct                  : 0x151A520,
            Offset                  : 0x7768,
            Origin                  : 0x10,
            Matrix                  : 0x1C,
            Fov                     : 0x40
        },

        Entity:
        {
            TableBase               : 0x135D120,
            EntryFirst              : 0x18,
            EntryNext               : 0x68,

            Entry:
            {
                Type                : 0x18,
                Descriptors         : 0x08,

                Desc:
                {
                    GlobalID        : 0x00,
                    EntityID        : 0x24,
                    DynFlags        : 0x28
                }
            },

            Unit:
            {
                Transport           : 0x1538,
                Origin              : 0x1548,
                Angle               : 0x1558,
                Casting             : 0x1B98,
                CastingStarted      : 0x1BB0,
                CastingWillEnd      : 0x1BB4,
                Channel             : 0x1BB8,
                ChannelStarted      : 0x1BBC,
                ChannelWillEnd      : 0x1BC0,

                Aura:
                {
                    Count1          : 0x2390,
                    Count2          : 0x1D10,
                    TableBase1      : 0x1D10,
                    TableBase2      : 0x1D18,
                    EntrySize       : 0x68,

                    Entry:
                    {
                        Owner       : 0x40,
                        SpellID     : 0x50,
                        Flags       : 0x58,
                        Stacks      : 0x59,
                        Level       : 0x5A,
                        EndTime     : 0x60
                    }
                },

                Desc:
                {
                    Creator         : 0x080,
                    Health          : 0x0F0,
                    Power           : 0x0F4,
                    HealthMax       : 0x10C,
                     PowerMax       : 0x110,
                    Level           : 0x158,
                    Flags           : 0x17C
                }
            },

            NPC:
            {
                Name1               : 0x16F0,
                Name2               : 0x00A0
            },

            Player:
            {
                Money1              : 0x2790,
                Money2              : 0x1890,
                Arch                : 0x2798,
                ArchCount           : 0x08,
                ArchSites           : 0x18,
                Target              : 0x77E8,
            },

            Object:
            {
                Bobbing             : 0x1E0,
                Transport           : 0x238,
                Origin              : 0x248,
                Rotation            : 0x258,
                Transform           : 0x4A0,
                Name1               : 0x498,
                Name2               : 0x0D8,

                Desc:
                {
                    Creator         : 0x030,
                    Display         : 0x040
                }
            }
        },

        NameCache:
        {
            TableBase               : 0x1316E98,
            EntryNext               : 0x00,

            Entry:
            {
                Guid                : 0x20,
                Name                : 0x31,
                Race                : 0x88,
                Class               : 0x90
            }
        },

        Cooldown:
        {
            TableBase               : 0x1354D50,
            EntryNext               : 0x08,

            Entry:
            {
                SpellID             : 0x10,
                 ItemID             : 0x14,
                SpellStartTime      : 0x18,
                SpellDuration       : 0x1C,
                GroupID             : 0x20,
                GroupStartTime      : 0x24,
                GroupDuration       : 0x28,
                IsActive            : 0x2C,
                GcdStartTime        : 0x30,
                GcdDuration         : 0x38
            }
        },

        BMAH:
        {
            Count                   : 0x15CE6E8,
            TableBase               : 0x15CE6F0,
            EntrySize               : 0xA8,

            Entry:
            {
                MarketID            : 0x00,
                  ItemID            : 0x08,
                MinimumBid          : 0x80,
                MaximumInc          : 0x88,
                CurrentBid          : 0x90,
                TimeLeft            : 0x98,
                BidCount            : 0xA0
            }
        },

        Chat:
        {
            Position                : 0x157627C,
            TableBase               : 0x151BD20,
            EntrySize               : 0x17F0,

            Entry:
            {
                SenderGuid          : 0x0000,
                SenderName          : 0x0034,
                FullMessage         : 0x0065,
                OnlyMessage         : 0x0C1D,
                ChannelNum          : 0x17D8,
                TimeStamp           : 0x17E8
            }
        }
    }
};
