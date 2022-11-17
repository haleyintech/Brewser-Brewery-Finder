export default function phoneFormat(input) {
    if(!input || isNaN(input)) return `input must be a number was sent ${input}`
    if(typeof(input) !== 'string') input = input.toString()
    if(input.length === 10){
      return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if(input.length < 10) {
      return 'was not supplied enough numbers please pass a 10 digit number'
    } else if(input.length > 10) {
      return 'was supplied too many numbers please pass a 10 digit number'
    }else{
      return 'something went wrong'
    }
  }