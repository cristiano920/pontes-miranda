import { SocialCard } from "@/components/ui/social-card";
import { Link as LinkIcon } from "lucide-react";
import { useState } from "react";

export function SocialCardDemo() {
  const [cards, setCards] = useState([
    {
      id: 1,
      author: {
        name: "Pontes Miranda Advogados",
        username: "pontesmiranda.adv",
        avatar: "assets/favicon_preto.png",
        timeAgo: "2h ago",
      },
      content: {
        text: "Nossa missão é oferecer uma advocacia inteligente, célere e personalizada, transformando desafios complexos em soluções seguras.",
        link: {
          title: "Pontes Miranda Advogados",
          description: "Advocacia especializada e de alta performance",
          icon: <LinkIcon className="w-5 h-5 text-blue-500" />,
        },
      },
      engagement: {
        likes: 142,
        comments: 38,
        shares: 12,
        isLiked: false,
        isBookmarked: false,
      },
    },
  ]);

  const handleAction = (id: number, action: string) => {
    console.log(`Card ${id}: ${action}`);
  };

  return (
    <div className="space-y-8">
      <div>
        {cards.map(card => (
          <SocialCard
            key={card.id}
            {...card}
            onLike={() => handleAction(card.id, 'liked')}
            onComment={() => handleAction(card.id, 'commented')}
            onShare={() => handleAction(card.id, 'shared')}
            onBookmark={() => handleAction(card.id, 'bookmarked')}
            onMore={() => handleAction(card.id, 'more')}
          />
        ))}
      </div>
    </div>
  );
}
