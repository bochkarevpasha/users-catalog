import React from 'react';
import type { User } from '../types';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <article className="user-card">
      <div className="user-avatar-wrapper">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="user-avatar"
        />
      </div>

      <div className="user-main">
        <h2 className="user-name">
          {user.firstName} {user.lastName}
        </h2>
        <p className="user-username">@{user.username}</p>
      </div>

      <div className="user-meta">
        <a className="user-email" href={`mailto:${user.email}`}>
          {user.email}
        </a>
        <p className="user-info">
          {user.age} • {user.gender}
        </p>
        {(user.company || user.address) && (
          <p className="user-extra">
            {user.company?.title && user.company?.name
              ? `${user.company.title}, ${user.company.name}`
              : null}
            {user.company && user.address ? ' · ' : null}
            {user.address?.city && user.address?.country
              ? `${user.address.city}, ${user.address.country}`
              : null}
          </p>
        )}
      </div>
    </article>
  );
};

