import './index.scss'
import React, { useState } from 'react';


export default function Home() {
    
    const [cells, setCells] = useState(Array(9).fill(' ')); //a função fill enche a array com um valor específico
    const [vez, setVez] = useState('✖');
    const [venceu, setVenceu] = useState();


    const vencedor = (cells) => {
        let casos = {
            casoUm: [ //horizontal
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            casoDois: [ //vertical
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            casoTres: [ //diagonal
                [0, 4, 8],
                [2, 4, 6]
            ]
        };

        //cada caso em um grupo de casos; se um dos casos ter os seus espacos ocupados por um mesmo valor que não seja em branco, o vencedor é definido

        for (let caso in casos) {
            casos[caso].forEach(possi => {
                if (
                    cells[possi[0]] === ' ' ||
                    cells[possi[1]] === ' ' ||   
                    cells[possi[2]] === ' '
                ) {
                    //um dos valores é vazio, logo, nada será feito
                } else if (
                    cells[possi[0]] === cells[possi[1]] &&
                    cells[possi[2]] === cells[possi[1]]
                ) {
                    console.log('debug: alguem venceu');
                    setVenceu(cells[possi[0]]);
                }
            });
        }
        console.log('debug: verificação');
    }

    const alterarCell = (num) => {
        let bloco = [...cells];

        if (bloco[num] !== ' ') {
            alert('Já clicado');
            return;
        }

        if (vez === '✖') {
            bloco[num] = '✖';
            setVez('◯')
        } else {
            bloco[num] = '◯';
            setVez('✖')
        }
        console.log('debug: celula adicionada');

        vencedor(bloco);
        setCells(bloco);
        console.log('debug: passou da verificaçõa')
    }

    const resetarJogo = () => {
        setVenceu(null);
        setCells(Array(9).fill(' '));    
    }


    const Celula = ({num}) => { //dentro dos parênteses, o componente recebe o parâmetro de nome num. O mesmo que props.num
        return <td onClick={() => alterarCell(num)}> {cells[num]} </td>
    }
    
    return (
        <main>
            <div>
                <h1>Teste de componentes</h1>
                <div> Vez: {vez} </div>
                <table>
                    <tbody>
                        <tr>
                            <Celula num={0} />
                            <Celula num={1} />
                            <Celula num={2} />
                        </tr>
                        <tr>
                            <Celula num={3} />
                            <Celula num={4} />
                            <Celula num={5} />
                        </tr>
                        <tr>
                            <Celula num={6} />
                            <Celula num={7} />
                            <Celula num={8} />
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='winner-container'>{ venceu && (
                <div>
                    <div className='wins'> {venceu} venceu! </div>
                    <button onClick={(e) => resetarJogo()}>Jogar novamente</button>
                </div>
                )
            }</div>
        </main>
    );
}
