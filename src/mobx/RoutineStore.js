const { observable, makeObservable, action } = require('mobx');

class RoutineStore {
  @observable routines = [];

  @action addRoutine = routine => {
    this.routines.push(routine);
  };
}

export default RoutineStore;
