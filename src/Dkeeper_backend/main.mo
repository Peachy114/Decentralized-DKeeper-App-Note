import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {

  public type Note  = {
    id: Nat;
    title: Text;
    content: Text;
  };

  var notes: List.List<Note>  = List.nil<Note>();
  var nextId: Nat = 0;

  public func createNote(titleText: Text, contentText: Text) {
    let newNote: Note = {
      id = nextId;
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };

  public query func redNotes(): async [Note] {
    return List.toArray(notes); 
  };

  public func removeNote(id: Nat) {
    notes := List.filter(notes, func (note: Note): Bool {
      note.id != id;
    });
  };
};
