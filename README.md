# google_sheet_data_processor
Just a little couple hour project to pull data from a published google sheet and junk when I wanted something fresh and small to work on.

Couple of things to do include making it compliant with [RFC4180](https://tools.ietf.org/html/rfc4180) I could probably do this with some regex, but I haven't been bothered to look up/work it out for myself as of yet.

Also, the ajax currently has sync : false in the options, which obviously isn't great. Could probably do with some sort of loading indicator or something while it tries.
