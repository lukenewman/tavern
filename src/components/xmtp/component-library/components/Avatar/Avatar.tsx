import BoringAvatar from 'boring-avatars'

interface AvatarProps {
  /**
   * Are we waiting on an avatar url?
   */
  isLoading?: boolean;
  /**
   * What, if any, avatar url is there?
   */
  url?: string;
  /**
   * What is the address associated with this avatar?
   */
  address?: string;
}

export const Avatar = ({ url, isLoading, address }: AvatarProps) => {
  if (isLoading) {
    return (
      <div className="animate-pulse flex">
        <div className="rounded-full bg-gray-200 h-12 w-12" />
      </div>
    );
  }

  if (url) {
    return (
      <img
        data-testid="avatar"
        className="min-w-[40px] max-w-[40px] h-[40px] rounded-full"
        src={url}
        alt={address}
      />
    );
  }

  return (
    <div data-testid="avatar">
      <BoringAvatar
        data-testid="avatar"
        name={address?.toLowerCase() ?? ''}
        size={32}
      />
    </div>
  );
};
