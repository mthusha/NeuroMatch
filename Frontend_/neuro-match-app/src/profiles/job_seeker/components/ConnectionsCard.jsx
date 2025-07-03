import React, { useEffect, useState } from "react";
import fetchNotFollowedCompanies from "../../../api/Company";
import { useAuth } from "../../../context/AuthContext";

const ConnectionsCard = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = user.email;

  useEffect(() => {
    const loadConnections = async () => {
      try {
        const data = await fetchNotFollowedCompanies(email);
        setConnections(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadConnections();
  }, [email]);

  if (loading) return <div className="sidebar-card">Loading connections...</div>;
  if (error) return <div className="sidebar-card">Error: {error}</div>;

  return (
    <div className="sidebar-card">
      <h3>Synaptic Connections</h3>

      {connections.length === 0 ? (
        <div className="no-connections">No connections available</div>
      ) : (
        connections.map((conn) => (
          <div className="connection-item" key={conn.id}>
            {conn.profilePictureBase64 ? (
              <img
                src={`data:image/jpeg;base64,${conn.profilePictureBase64}`}
                alt={conn.name}
                className="connection-avatar"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="connection-avatar">
                {conn.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}

            <div className="connection-info">
              <h4>{conn.name}</h4>
              <p
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100px",
                }}
              >
                {conn.description || "No description"}
              </p>
            </div>
           <button className="connect-btn">Unsync</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ConnectionsCard;
