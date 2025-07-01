import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddUserPage.module.css';

const AddUserPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const formatPhone = (phone) => {
    // Remove todos os caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '');
    
    // Se começar com 0, remove o 0
    if (cleaned.startsWith('0')) {
      return cleaned.substring(1);
    }
    
    // Se não começar com 55 (código do Brasil), adiciona
    if (!cleaned.startsWith('55') && cleaned.length >= 10) {
      return '55' + cleaned;
    }
    
    return cleaned;
  };

  const validateForm = () => {
    if (!formData.nome.trim()) {
      setMessage('Nome é obrigatório');
      setMessageType('error');
      return false;
    }
    
    if (!formData.email.trim()) {
      setMessage('Email é obrigatório');
      setMessageType('error');
      return false;
    }
    
    if (!formData.email.includes('@')) {
      setMessage('Email deve ter um formato válido');
      setMessageType('error');
      return false;
    }
    
    if (!formData.telefone.trim()) {
      setMessage('Telefone é obrigatório');
      setMessageType('error');
      return false;
    }
    
    const cleanPhone = formatPhone(formData.telefone);
    if (cleanPhone.length < 12 || cleanPhone.length > 14) {
      setMessage('Telefone deve ter formato válido (ex: 48999999999)');
      setMessageType('error');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      const userData = {
        nome: formData.nome.trim(),
        email: formData.email.trim().toLowerCase(),
        telefone: formatPhone(formData.telefone),
        password: 'flowers@2025' // Senha padrão
      };
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add-user-complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(`✅ Usuário criado com sucesso! Email e WhatsApp serão enviados automaticamente.`);
        setMessageType('success');
        
        // Limpar formulário após 2 segundos
        setTimeout(() => {
          setFormData({
            nome: '',
            email: '',
            telefone: ''
          });
          setMessage('');
        }, 3000);
        
      } else {
        setMessage(`❌ Erro: ${data.error || 'Erro ao criar usuário'}`);
        setMessageType('error');
      }
      
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setMessage('❌ Erro de conexão com o servidor');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Cadastrar Novo Usuário</h1>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/admin')}
        >
          ← Voltar
        </button>
      </header>

      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="nome">Nome Completo *</label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Digite o nome completo"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="exemplo@email.com"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="telefone">Telefone (WhatsApp) *</label>
              <input
                id="telefone"
                name="telefone"
                type="text"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="48999999999"
                className={styles.input}
                required
              />
              <small className={styles.hint}>
                Formato: DDD + número (ex: 48999999999)
              </small>
            </div>



            <div className={styles.passwordInfo}>
              <h3>🔑 Informações de Acesso</h3>
              <p><strong>Senha padrão:</strong> flowers@2025</p>
              <p><strong>Login:</strong> O email cadastrado acima</p>
              <small>O usuário poderá alterar a senha no primeiro acesso</small>
            </div>

            {message && (
              <div className={`${styles.message} ${styles[messageType]}`}>
                {message}
              </div>
            )}

            <div className={styles.submitContainer}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? '⏳ Criando usuário...' : '✅ Criar Usuário'}
              </button>
            </div>
          </form>

                      <div className={styles.infoBox}>
              <h3>📋 O que acontece após criar o usuário:</h3>
              <ul>
                <li>✅ Usuário é cadastrado no sistema</li>
                <li>📧 Email de boas-vindas é enviado automaticamente</li>
                <li>📱 WhatsApp com credenciais é enviado automaticamente</li>
                <li>🔑 Senha padrão: <code>flowers@2025</code></li>
                <li>🔄 Usuário pode alterar senha no primeiro acesso</li>
                <li>🎫 Número do ingresso é gerado automaticamente</li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage; 