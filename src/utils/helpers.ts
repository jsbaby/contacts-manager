import * as crypto from "crypto";
export const uuid = () => {
    const UUID_SIZE =16;
    var data = crypto.randomBytes(UUID_SIZE);
  // mark as random - RFC 4122 § 4.4
    data[6] = data[6] & 0x4f | 0x40;
    data[8] = data[8] & 0xbf | 0x80;

    var result = "";

    for (let offset = 0; offset < UUID_SIZE; ++offset) {
        var byte = data[offset];
        if (offset === 4 || offset === 6 || offset === 8) {
        result += "-";
        }
        if (byte < 16) {
        result += "0";
        }
        result += byte.toString(16).toLowerCase();
    }

    return result;
  }
  
  export const randomId = () => Math.floor(Math.random()*999)
  
  export const noop = () => {}
  
  // dump state tree in string format
  export const dumpState = (item:any, depth = 1) => {
      // if (depth == 1) console.log('\n')
  
      const MAX_DEPTH = 100
      depth = depth || 0
      let isString = typeof item === 'string'
      let isDeep = depth > MAX_DEPTH
  
      if (isString || isDeep) {
          console.log(item)
          return
      }
  
      for (var key in item) {
          console.group(key)
          dumpState(item[key], depth + 1)
          console.groupEnd()
      }
  }
  
  // for fsm test
  export const dump = (svc:any) => {
      if(svc.state){
          console.log(
              '\n--------------------------------------\n[state]',
              svc.state.value,
              '\n  [ctx]',
              svc.state.context,
              '\n--------------------------------------',
          )
      }else{
          console.log( 'empty: ', svc )
      }
  }
  
  
  export const current = (state:any) => state.toStrings().pop()
  
  export const timer = (time:any) => {
      return new Promise((resolve, reject) => {
          setTimeout(resolve, time)
      })
  }
  
  export const randomFloat = (min=0, max=999) => {
      return Math.random() * (max - min) + min;
  }
  
  export const random = (min=0, max=999) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  