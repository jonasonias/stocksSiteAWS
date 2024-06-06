import React, { useState } from 'react';
import CustomAlert from '../CustomAlert'; // Importe o componente CustomAlert

const AddAcao = () => {
    const [ticker, setTicker] = useState('');
    const [nome, setNome] = useState('');
    const [setorDeAtuacao, setSetorDeAtuacao] = useState('');
    const [subsetorDeAtuacao, setSubsetorDeAtuacao] = useState('');
    const [segmentoDeAtuacao, setSegmentoDeAtuacao] = useState('');
    const [valorDeMercado, setValorDeMercado] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleSubmit = async () => {
        const acao = {
            ticker,
            nome,
            setorDeAtuacao,
            subsetorDeAtuacao,
            segmentoDeAtuacao,
            valorDeMercado: parseFloat(valorDeMercado)
        };

        try {
            const response = await fetch('http://localhost:3001/acoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(acao)
            });

            const message = await response.text();
            if (response.ok) {
                setAlertMessage('Ação criada com sucesso');
                setAlertType('success');
            } else {
                setAlertMessage(message);
                setAlertType('error');
            }
        } catch (error) {
            console.error('Erro ao criar ação:', error);
            setAlertMessage('Erro ao criar ação');
            setAlertType('error');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="Ticker"
            />
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
            />
            <input
                type="text"
                value={setorDeAtuacao}
                onChange={(e) => setSetorDeAtuacao(e.target.value)}
                placeholder="Setor de Atuação"
            />
            <input
                type="text"
                value={subsetorDeAtuacao}
                onChange={(e) => setSubsetorDeAtuacao(e.target.value)}
                placeholder="Subsetor de Atuação"
            />
            <input
                type="text"
                value={segmentoDeAtuacao}
                onChange={(e) => setSegmentoDeAtuacao(e.target.value)}
                placeholder="Segmento de Atuação"
            />
            <input
                type="text"
                value={valorDeMercado}
                onChange={(e) => setValorDeMercado(e.target.value)}
                placeholder="Valor de Mercado (em reais)"
            />
            <button onClick={handleSubmit}>Adicionar Ação</button>

            { /* Renderize o CustomAlert se houver uma mensagem de alerta */ }
            {alertMessage && (
                <CustomAlert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => {
                        setAlertMessage('');
                        setAlertType('');
                    }}
                />
            )}
        </div>
    );
};

export default AddAcao;