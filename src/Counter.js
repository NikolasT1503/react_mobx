import { auto } from "@popperjs/core";
import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
  when,
} from "mobx";
import { observer } from "mobx-react";
import React, { Component, useEffect } from "react";

/* function Counter(props) {
    const [counter, setCounter] = useState(0);

    return (
        <div>
            <button onClick={() => setCounter(counter - 1)}>-</button>
            {counter}
            <button onClick={() => setCounter(counter + 1)}>+</button>
        </div>
    );
} */

/* const Counter2 = observer(() => {
  const store = useLocalObservable(() => {
      const result = {
        counter: 0,
        increment() {
            this.counter++
        },
        decrement() {
            this.counter--
        },
    };
    return result
  });
  return (
    <div>
      <button onClick={store.decrement}>-</button>
      {store.counter??0}
      <button onClick={store.increment}>+</button>
    </div>
  );
}) */
/* function CounterStoreFunction() {
  return makeObservable(
    {
      counter: 16,
      increment() {
        this.counter++;
      },
      decrement() {
        this.counter--;
      },
      get color() {
        return this.counter > 0 ? "green" : "blue";
      },
    },
    {
      counter: observable,
      color: computed,
      increment: action.bound,
      decrement: action.bound,
    }
  );
}
const store = CounterStoreFunction(); */

/* const Counter3 = observer(({ initCounter }) => {
  useEffect(() => {
    runInAction(() => {
      store.counter = initCounter ?? 0;
    });
  }, [initCounter]);
  return (
    <div>
      <button onClick={store.decrement}>-</button>
      <span style={{color: store.color}}> {store.counter ?? 0} </span>
      <button onClick={store.increment}>+</button>
    </div>
  );
}); */

/* export const Counter4 = observer(class extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {initCounter} = this.props;
        runInAction(() => {
            store.counter = initCounter ?? 0;
          });
    }

  render() {
    return (
      <div>
        <button onClick={store.decrement}>-</button>
        <span style={{ color: store.color }}> {store.counter ?? 0} </span>
        <button onClick={store.increment}>+</button>
      </div>
    );
  }
}) */

/* export const Counter5 = observer(class extends Component {

    counter = 0;
    increment() { this.counter++; }
    decrement() { this.counter--; }
    get color() { return this.counter > 0 ? "green" : "blue" }
      
    constructor(props){
        super(props);
        makeObservable(
            this,
            {
                counter: observable,
                color: computed,
                increment: action.bound,
                decrement: action.bound,
            }            
        )
    }
    componentDidMount(){
        const {initCounter} = this.props;
        runInAction(() => {
            this.counter = initCounter ?? 0;
          });
    }

  render() {
    return (
      <div>
        <button onClick={this.decrement}>-</button>
        <span style={{ color: this.color }}> {this.counter ?? 0} </span>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}) */

/* @observer            - deprecated method
class Counter6 extends Component {
    @observable counter = 0;
    @action increment = () => { this.counter++; }
    @action.bound decrement() { this.counter--; }
    @computed get color() { return this.counter > 0 ? "green" : "blue" }
      
    constructor(props){
        super(props);
        makeObservable(this)
    }
    componentDidMount(){
        const {initCounter} = this.props;
        runInAction(() => {
            this.counter = initCounter ?? 0;
          });
    }

  render() {
    return (
      <div>
        <button onClick={this.decrement}>-</button>
        <span style={{ color: this.color }}> {this.counter ?? 0} </span>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
} */

//изучаем MobX реакции
/* export const Counter7 = observer(class extends Component {

  counter = 0;
  increment() { this.counter++; }
  decrement() { this.counter--; }
  get color() { return this.counter > 0 ? "green" : "blue" }
    
  constructor(props){
      super(props);
      makeObservable(
          this,
          {
              counter: observable,
              color: computed,
              increment: action.bound,
              decrement: action.bound,
          }            
      );
      //autorun(()=>{console.log(this.counter)})
      when(() => (this.counter > 16), () => console.log(this.counter))
      reaction(() => this.counter, (counter, prevCounter) => console.log(prevCounter, ' -> ', counter))
  }
  componentDidMount(){
      const {initCounter} = this.props;
      runInAction(() => {
          this.counter = initCounter ?? 0;
        });
  }


render() {
  return (
    <div>
      <button onClick={this.decrement}>-</button>
      <span style={{ color: this.color }}> {this.counter ?? 0} </span>
      <button onClick={this.increment}>+</button>
    </div>
  );
}
}) */

function CounterStoreFunction() {
  return makeObservable(
    {
      counter: 16,
      increment() {
        this.counter++;
      },
      decrement() {
        this.counter--;
      },
      get color() {
        return this.counter > 0 ? "green" : "blue";
      },
    },
    {
      counter: observable,
      color: computed,
      increment: action.bound,
      decrement: action.bound,
    }
  );
}
const store = CounterStoreFunction();

autorun(()=>{console.log(`color: ${store.color}`)})
const disposer = reaction(()=>store.counter, (counter, prevCounter)=>{
  console.log(counter, prevCounter)
  if (counter >5) {
    disposer();
  }
})

const Counter8 = observer(({ initCounter }) => {
  useEffect(() => {
    runInAction(() => {
      store.counter = initCounter ?? 0;
    });
  }, [initCounter]);
  return (
    <div>
      <button onClick={store.decrement}>-</button>
      <span style={{color: store.color}}> {store.counter ?? 0} </span>
      <button onClick={store.increment}>+</button>
    </div>
  );
});

export default Counter8;

/* Counter3.defaultProps = {
  initCounter: 0,
}; */
