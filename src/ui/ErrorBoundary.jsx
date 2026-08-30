import { Component } from 'react';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="card" style={{ border: '1px solid var(--warning-border, #ef4444)', padding: '2rem', margin: '1rem', color: 'var(--text-primary)' }}>
                    <h2 style={{ color: 'var(--warning-text, #fca5a5)', marginBottom: '8px' }}>An unexpected error occurred.</h2>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
                            Reload Application
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                try {
                                    localStorage.removeItem('learning-os-engine-storage');
                                    localStorage.removeItem('prompter-tour-completed');
                                } catch (e) {
                                    console.warn('Could not clear localStorage:', e);
                                }
                                window.location.href = '/';
                            }}
                        >
                            Reset Data & Reload
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
