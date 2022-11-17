export default function phoneFormat(input) {
    if(!input || isNaN(input)) console.log(`input must be a number was sent ${input}`)
    if(typeof(input) !== 'string') input = input.toString()
    if(input.length === 10){
      return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }
  }