export function normalize(code: string): string {

    let newC = code;
    while (newC[0] == '\n' || newC[0] == ' ') {
        newC = newC.substring(1);
    };

    return newC;
}