import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './uploadPage.css';

const UploadPage = () => {
    const { uploadId } = useParams();
    const [uploadConfig, setUploadConfig] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);

    // Buscar configurações do upload
    useEffect(() => {
        const fetchUploadConfig = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/uploads/${uploadId}/info`);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        setError('Link de upload não encontrado ou expirado');
                    } else {
                        setError('Erro ao carregar informações do upload');
                    }
                    return;
                }
                
                const config = await response.json();
                setUploadConfig(config);
            } catch (err) {
                console.error('Erro ao buscar config:', err);
                setError('Erro de conexão');
            }
        };

        if (uploadId) {
            fetchUploadConfig();
        }
    }, [uploadId]);

    // Verificar se arquivo é válido
    const isValidFile = (file) => {
        if (!uploadConfig) return false;
        
        // Verificar tamanho
        if (file.size > uploadConfig.maxFileSize) {
            return false;
        }
        
        // Verificar tipo
        if (!uploadConfig.allowedTypes.includes(file.type)) {
            return false;
        }
        
        return true;
    };

    // Formatar tamanho do arquivo
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Lidar com seleção de arquivo
    const handleFileSelect = (file) => {
        if (!isValidFile(file)) {
            const maxSize = formatFileSize(uploadConfig.maxFileSize);
            const allowedTypes = uploadConfig.allowedTypes.join(', ');
            setError(`Arquivo inválido. Tamanho máximo: ${maxSize}. Tipos permitidos: ${allowedTypes}`);
            return;
        }
        
        setSelectedFile(file);
        setError('');
    };

    // Drag and drop handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    // Upload do arquivo
    const handleUpload = async () => {
        if (!selectedFile) return;
        
        setUploading(true);
        setUploadProgress(0);
        setError('');
        
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        try {
            const xhr = new XMLHttpRequest();
            
            // Progress handler
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded / e.total) * 100);
                    setUploadProgress(progress);
                }
            });
            
            // Response handler
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    setUploadComplete(true);
                    setUploading(false);
                } else {
                    const errorData = JSON.parse(xhr.responseText);
                    setError(errorData.message || 'Erro no upload');
                    setUploading(false);
                }
            });
            
            xhr.addEventListener('error', () => {
                setError('Erro de conexão durante upload');
                setUploading(false);
            });
            
            xhr.open('POST', `${process.env.REACT_APP_BACKEND_URL}/api/uploads/${uploadId}/upload`);
            xhr.send(formData);
            
        } catch (err) {
            console.error('Erro no upload:', err);
            setError('Erro no upload');
            setUploading(false);
        }
    };

    if (!uploadConfig && !error) {
        return (
            <div className="upload-page">
                <div className="upload-container">
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Carregando...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error && !uploadConfig) {
        return (
            <div className="upload-page">
                <div className="upload-container">
                    <div className="error-state">
                        <h2>Erro</h2>
                        <p>{error}</p>
                        <p>Verifique se o link está correto e ainda válido.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (uploadComplete) {
        return (
            <div className="upload-page">
                <div className="upload-container">
                    <div className="success-state">
                        <h2>Upload Concluído!</h2>
                        <p>Seu arquivo foi enviado com sucesso.</p>
                        <div className="file-info">
                            <p><strong>Arquivo:</strong> {selectedFile.name}</p>
                            <p><strong>Tamanho:</strong> {formatFileSize(selectedFile.size)}</p>
                        </div>
                        <p>Obrigado por compartilhar!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="upload-page">
            <div className="upload-container">
                <div className="upload-header">
                    <h1>Enviar Arquivo</h1>
                    <h2>{uploadConfig.title}</h2>
                    {uploadConfig.uploaderEmail && (
                        <p className="uploader-email">Para: {uploadConfig.uploaderEmail}</p>
                    )}
                </div>

                <div className="upload-info">
                    <p><strong>Válido até:</strong> {new Date(uploadConfig.expiresAt).toLocaleString('pt-BR')}</p>
                    <p><strong>Tamanho máximo:</strong> {formatFileSize(uploadConfig.maxFileSize)}</p>
                    <p><strong>Tipos aceitos:</strong> {uploadConfig.allowedTypes.join(', ')}</p>
                </div>

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}

                <div 
                    className={`upload-area ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    {!selectedFile ? (
                        <>
                            <div className="upload-icon">📄</div>
                            <p>Arraste e solte seu arquivo aqui</p>
                            <p>ou</p>
                            <input
                                type="file"
                                id="file-input"
                                onChange={(e) => handleFileSelect(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                            <button 
                                className="select-file-btn"
                                onClick={() => document.getElementById('file-input').click()}
                            >
                                Selecionar Arquivo
                            </button>
                        </>
                    ) : (
                        <div className="selected-file">
                            <div className="file-icon">📄</div>
                            <div className="file-details">
                                <p className="file-name">{selectedFile.name}</p>
                                <p className="file-size">{formatFileSize(selectedFile.size)}</p>
                            </div>
                            <button 
                                className="remove-file-btn"
                                onClick={() => setSelectedFile(null)}
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>

                {uploading && (
                    <div className="upload-progress">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <p>{uploadProgress}% - Enviando...</p>
                    </div>
                )}

                <div className="upload-actions">
                    <button 
                        className="upload-btn"
                        onClick={handleUpload}
                        disabled={!selectedFile || uploading}
                    >
                        {uploading ? 'Enviando...' : 'Enviar Arquivo'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadPage; 