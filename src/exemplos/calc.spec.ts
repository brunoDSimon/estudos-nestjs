export function add(x: number, y: number)  {
    return x + y;
}

describe('teste inicial', ()=> {
    test('add funcao', () => {
        expect(add(1,2)).toEqual(3);
    })
});