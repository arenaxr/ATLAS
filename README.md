# ATLAS (Authority on The Locations of ARENA Stuff)
ATLAS will be like an aggregation of maps of major roadways. We intend that by using ATLAS, one can find any ARENA, though the details of scenes and processes we believe will be handled by other systems. The most typical usage of ATLAS would be to find an ARENA near one's own geo-location.

## Usage

### Install MongoDB

Comprehensive reference:
https://docs.mongodb.com/manual/administration/install-community/
Note: enterprise level mongodb is not necessary.

One-liners:
For a Mac w Brew:
`brew install mongodb-community@4.2`

### Start MongoDB server

TODO:Add Mac invocation

### Install web app dependencies

`cd atlas-web-app/`
`npm install`

### Start web app

ATLAS is a Sails web app. See `README.md` in `atlas-web-app/` for some more info and links about Sails.

`cd atlas-web-app/`

`sails lift` #note: you will need to `npm install` node modules if this is your first run

`alter` #there is no migrate setting chosen yet. Please type 'alter' and hit enter

### Populate test data
Currently, I am still populating my own test data each time. Please see https://github.com/conix-center/ATLAS/blob/master/atlas-web-app/api/models/Record.js for the structure of an ATLAS record. Sails auto-gens a RESTful API from that `Record.js` file. The default routes work fine for us right now, but could use more syntactic sugga:

https://sailsjs.com/documentation/concepts/blueprints?blueprint-routes

For us, with this web app started in dev mode, adding a record via default routes looks like this in a browser navbar:

`localhost:1337/record/create?uuid=deadbeef`

### See test data
Similarly, to see what we just created, we would put the following in the navbar:

`http://localhost:1337/record/`

## The ATLAS-DNS Analogy
ATLAS is to ARENA as DNS is to the Internet

**Well-captured** points of this analogy:
- Both ATLAS and DNS are authorities on critical attributes of networked devices
- Both ATLAS and DNS require manual entry for some subset of ground truth
- Both ATLAS and DNS (well, future versions of ATLAS) are hierarchical, and can be traversed simply via recursion

**Uncaptured** points with the ATLAS-DNS analogy:
- DNS adds 1 layer of abstraction for usability (textual domain name mapped to IP address)
- However, ATLAS is probably going to do much more than a simple 1-to-1 mapping (talk of generating id's, even just performing geospatial calculations to find MQTT servers within *n* miles is astronomically more compute than DNS)

## Design Doc (WIP)
https://docs.google.com/presentation/d/1dc1RdlGROBYj1zIoPR8HX_RBIKn8-KRmNZscXVrdIs0/edit#slide=id.p

## Design Decisions
These conclusions we have reached by collaboration and consensus, but are not quite "written in stone" yet.
- ATLAS server will implement a RESTful API (viz. pass documents, not rely on saved server or client state, etc.)
- Luke will write server in Node.js
  - I (Luke) like learning new languages
  - Node.js comes with very handy modules for web server sorts of things
  - Ivan is a *minor deity* in Node.js land
