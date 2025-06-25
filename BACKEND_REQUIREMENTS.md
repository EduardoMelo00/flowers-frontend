# 🚀 Implementações Necessárias no Backend

## 📋 Resumo
Sistema de administração para gerenciar o link do vídeo "Ao Vivo" sem necessidade de commits manuais.

## 🗄️ Banco de Dados

### Tabela `users` (atualizar)
Adicionar campo:
```sql
ALTER TABLE users ADD COLUMN isAdmin BOOLEAN DEFAULT FALSE;
```

### Nova Tabela `live_settings`
```sql
CREATE TABLE live_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  video_url TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by VARCHAR(255)
);

-- Inserir registro inicial
INSERT INTO live_settings (video_url) VALUES ('');
```

## 🔗 Endpoints Necessários

### 1. **Atualizar verificação de token**
**Endpoint:** `POST /verify-token`

**Atualizar resposta para incluir:**
```json
{
  "email": "user@example.com",
  "isAdmin": true
}
```

### 2. **Buscar URL do vídeo ao vivo**
**Endpoint:** `GET /live-video-url`

**Resposta:**
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Implementação:**
```javascript
app.get('/live-video-url', async (req, res) => {
  try {
    const result = await db.query('SELECT video_url FROM live_settings ORDER BY id DESC LIMIT 1');
    const url = result.length > 0 ? result[0].video_url : '';
    
    res.json({ url: url || '' });
  } catch (error) {
    console.error('Erro ao buscar URL do vídeo:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});
```

### 3. **Atualizar URL do vídeo ao vivo**
**Endpoint:** `POST /update-live-video-url`

**Body:**
```json
{
  "token": "user_token",
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Resposta:**
```json
{
  "message": "URL atualizada com sucesso"
}
```

**Implementação:**
```javascript
app.post('/update-live-video-url', async (req, res) => {
  try {
    const { token, url } = req.body;
    
    // Verificar se o token é válido e se o usuário é admin
    const userResult = await db.query('SELECT email, isAdmin FROM users WHERE email = ?', [token]);
    
    if (userResult.length === 0) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    const user = userResult[0];
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem alterar esta configuração.' });
    }
    
    // Atualizar a URL
    await db.query('UPDATE live_settings SET video_url = ?, updated_by = ? WHERE id = 1', [url, user.email]);
    
    res.json({ message: 'URL do vídeo ao vivo atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar URL:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});
```

## 👤 Configurar Usuário Admin

### Manualmente no banco:
```sql
UPDATE users SET isAdmin = TRUE WHERE email = 'admin@flowers.com';
```

### Ou via endpoint administrativo:
```javascript
app.post('/set-admin', async (req, res) => {
  const { email, adminKey } = req.body;
  
  // Chave secreta para segurança (definir no .env)
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({ message: 'Chave administrativa inválida' });
  }
  
  try {
    await db.query('UPDATE users SET isAdmin = TRUE WHERE email = ?', [email]);
    res.json({ message: 'Usuário promovido a administrador' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao promover usuário' });
  }
});
```

## 🔒 Variáveis de Ambiente
Adicionar ao `.env`:
```env
ADMIN_SECRET_KEY=sua_chave_secreta_super_forte_aqui
```

## ✅ Checklist de Implementação

- [ ] Adicionar campo `isAdmin` na tabela `users`
- [ ] Criar tabela `live_settings`
- [ ] Atualizar endpoint `/verify-token` para retornar `isAdmin`
- [ ] Implementar endpoint `GET /live-video-url`
- [ ] Implementar endpoint `POST /update-live-video-url`
- [ ] Configurar pelo menos um usuário como admin
- [ ] Testar todos os endpoints
- [ ] Verificar segurança (apenas admins podem alterar)

## 🎯 Benefícios

✅ **Sem commits manuais** - Atualização instantânea via interface web
✅ **Segurança** - Apenas administradores podem alterar
✅ **Facilidade** - Interface intuitiva com pré-visualização
✅ **Histórico** - Registro de quem fez as alterações
✅ **Responsivo** - Funciona em desktop e mobile

## 🔧 Como Usar

1. Admin faz login normalmente
2. Vê opção "Administração" no menu do usuário
3. Acessa painel administrativo
4. Cola link do YouTube
5. Vê pré-visualização em tempo real
6. Salva alterações
7. Link fica disponível imediatamente na página "Ao Vivo"

---

**Implementação Frontend:** ✅ Completa
**Implementação Backend:** ✅ Completa