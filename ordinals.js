function Property(indFind, check){
  this.indFind = indFind;
  this.check = check;
}

let properties = [ // Each property must be unique: No ordinal can have two properties at once!
  new Property( // Property 0: Successor ordinal property.
    function(index){ // Just returns the remainder. No further FS-ing is needed, anyway.
      return index % 1;
    }, 
    function(value){ // Returns true if null or ends with 0, false otherwise
      return (value[0] == undefined) || (value[value.length - 1] == 0);
    }
  ),
  new Property( // Property 1: Everything else (for now).
    function(index){
      return 1/(1-(index%1)) - 1;
    },
    function(value){
      return value[value.length - 1] > 0;
    }
  )
];

function Ordinal(val, index){
  this.value = val;
  this.index = Math.min(100, index);
  
  this.findProperty = function() {
    let i = properties.length - 1;
    while(!(properties[i].check(this.value)) && i >= 0){ // If it throws an error, this ordinal has no property and the properties array must be modified
      i--;
    }
    return i;
  }
  
  this.property = this.findProperty();
  
  this.expand = function() {
    let nextVal = [];
    for(let i in this.value){
      nextVal.push(this.value[i]);
    }
    
    if(this.property != 0){
      let lookFor = nextVal.pop() - 1;
      let found = Infinity;
      let explored = [];
      let fsSkip = 0;
      
      if(nextVal[nextVal.length - 1] == lookFor + 1){
        fsSkip = 1;
      }
      
      while(found > lookFor && nextVal.length > 0){
        found = nextVal.pop();
        explored.push(found);
      }
      explored.reverse();
      
      if(nextVal[nextVal.length - 1] == lookFor + 1){
        fsSkip = 0;
      }
      
      nextVal = nextVal.concat(explored);
      
      if(found != lookFor){
        if(found < lookFor){
          explored[0] = lookFor;
          nextVal = nextVal.concat(explored);
        } else {
          explored.unshift(lookFor);
        }
        if(((nextVal.length - explored.length) == -1) && (fsSkip == 0)){
          nextVal = nextVal.concat(explored);
        }
      }
      
      for(let i = 0; i < Math.floor(this.index + fsSkip); i++){
        nextVal = nextVal.concat(explored);
      }
      
    } else {
      console.log("Successor ordinals can't be expanded any further!");
    }
    
    return new Ordinal(nextVal, properties[this.property].indFind(this.index));
  }
  
  this.fullExpand = function() {
    let a = this.expand();
    
    while(a.property != 0){
      a = a.expand();
    }
    
    return a;
  }
}
