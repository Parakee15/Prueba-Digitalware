export class StringHelper {
    public static zfill(numb: number, width: number) {
        let numberOutput = Math.abs(numb);
        let length = numb.toString().length;
        let zero = "0";

        if (width <= length) {
            if (numb < 0) {
                return ("-" + numberOutput.toString());
            } else {
                return numberOutput.toString();
            }
        } else {
            if (numb < 0) {
                return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
            } else {
                return ((zero.repeat(width - length)) + numberOutput.toString());
            }
        }
    }
}