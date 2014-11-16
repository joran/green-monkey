green-monkey
============

This is just an experiment on howto provide a simple store (simple in the meaning "simple to use by components"). 
Currently the implementation is an in-memory store that provides a list of values, and new values are appended 
to the list, this could easily be changed to something meaningfull.

The store is attached to the component by mixin, and provides some life cycle methods to automatically hookup the component with the store and dispatcher.  

