export default function Toast({ msg, type }) {
    // role="status" implies aria-live="polite"; adding aria-live explicitly
    // alongside role="alert" was contradictory (alert is assertive by default).
    return (
        <div className={`toast`} role="status" style={type === 'warn' ? { borderColor: 'rgba(245,158,11,0.5)' } : {}}>
            {msg}
        </div>
    );
}
