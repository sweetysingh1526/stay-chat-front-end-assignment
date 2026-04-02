import { useState } from "react";

export default function App() {
  const [files, setFiles] = useState([]);

  const handleUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    const formattedFiles = uploadedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      type: file.type,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setFiles((prev) => [...prev, ...formattedFiles]);
  };

  const handleDelete = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📁 File Vault</h1>
        <p style={styles.subtitle}>Upload and manage your files</p>
      </div>

      <div style={styles.uploadSection}>
        <label htmlFor="fileInput" style={styles.uploadLabel}>
          <span style={styles.uploadIcon}>⬆️</span>
          <span style={styles.uploadText}>Choose Files to Upload</span>
          <input
            id="fileInput"
            type="file"
            multiple
            onChange={handleUpload}
            style={styles.fileInput}
          />
        </label>
      </div>

      <div style={styles.stats}>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>{files.length}</span>
          <span style={styles.statLabel}>Files</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>
            {files.reduce((acc, f) => acc + parseFloat(f.size), 0).toFixed(2)}
          </span>
          <span style={styles.statLabel}>KB Total</span>
        </div>
      </div>

      <div style={styles.list}>
        {files.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>📂</span>
            <p style={styles.emptyText}>No files uploaded yet</p>
            <p style={styles.emptySubtext}>Upload files to get started</p>
          </div>
        ) : (
          files.map((file) => (
            <div key={file.id} style={styles.card}>
              <div style={styles.cardLeft}>
                {file.preview ? (
                  <img src={file.preview} alt="preview" style={styles.image} />
                ) : (
                  <div style={styles.iconPlaceholder}>📄</div>
                )}

                <div style={styles.fileInfo}>
                  <p style={styles.fileName}>{file.name}</p>
                  <p style={styles.fileMeta}>
                    {file.size} • {file.type || "Unknown type"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(file.id)}
                style={styles.deleteButton}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    color: "white",
  },
  title: {
    fontSize: "48px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    textShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
  subtitle: {
    fontSize: "18px",
    margin: "0",
    opacity: "0.9",
    fontWeight: "400",
  },
  uploadSection: {
    marginBottom: "30px",
  },
  uploadLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "40px",
    background: "white",
    borderRadius: "16px",
    border: "3px dashed #667eea",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  uploadIcon: {
    fontSize: "48px",
  },
  uploadText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#667eea",
  },
  fileInput: {
    display: "none",
  },
  stats: {
    display: "flex",
    gap: "16px",
    marginBottom: "30px",
  },
  statItem: {
    flex: "1",
    background: "rgba(255,255,255,0.95)",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  statNumber: {
    display: "block",
    fontSize: "32px",
    fontWeight: "700",
    color: "#667eea",
    marginBottom: "4px",
  },
  statLabel: {
    display: "block",
    fontSize: "14px",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  emptyState: {
    background: "rgba(255,255,255,0.95)",
    padding: "60px 20px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  emptyIcon: {
    fontSize: "64px",
    display: "block",
    marginBottom: "16px",
  },
  emptyText: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 8px 0",
  },
  emptySubtext: {
    fontSize: "14px",
    color: "#999",
    margin: "0",
  },
  card: {
    display: "flex",
    gap: "16px",
    padding: "16px",
    background: "white",
    borderRadius: "12px",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  cardLeft: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    flex: "1",
    minWidth: "0",
  },
  image: {
    width: "64px",
    height: "64px",
    objectFit: "cover",
    borderRadius: "8px",
    flexShrink: "0",
    border: "2px solid #f0f0f0",
  },
  iconPlaceholder: {
    width: "64px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    background: "#f5f5f5",
    borderRadius: "8px",
    flexShrink: "0",
  },
  fileInfo: {
    minWidth: "0",
    flex: "1",
  },
  fileName: {
    margin: "0 0 6px 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  fileMeta: {
    margin: "0",
    fontSize: "13px",
    color: "#999",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  deleteButton: {
    padding: "10px 20px",
    background: "#ff4757",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    flexShrink: "0",
  },
};
