
import React from 'react';
import { Phone, MessageCircle, MapPin, Star, ShieldCheck, Heart } from 'lucide-react';
import { Contact,CategoryType } from '@/types';

interface ContactCardProps {
  contact: Contact;
  onCall: (phone: string) => void;
  onWhatsApp: (phone: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onCall, onWhatsApp, isFavorite, onToggleFavorite }) => {
  // Déterminer si on doit afficher WhatsApp (tous sauf Urgences)
  const showWhatsApp = contact.category !== CategoryType.URGENCES;
  
  // Préparer le numéro WhatsApp (si non spécifié, on prend le téléphone et on s'assure qu'il y a l'indicatif)
  const getWhatsAppNumber = () => {
    if (contact.whatsapp) return contact.whatsapp;
    // Si c'est un numéro court ou local sans indicatif, on ajoute 229 pour WhatsApp
    const cleanPhone = contact.phone.replace(/\s+/g, '');
    return cleanPhone.length === 8 ? `229${cleanPhone}` : cleanPhone;
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all group duration-300 h-full flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
              {contact.subCategory}
            </span>
            {contact.isVerified && (
              <div className="flex items-center gap-0.5 text-green-600 font-bold text-[9px] uppercase">
                <ShieldCheck size={12} className="fill-green-600/10" />
                Vérifié
              </div>
            )}
          </div>
          {onToggleFavorite && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite(contact.id);
              }}
              className={`p-2 rounded-full transition-all active:scale-125 flex-shrink-0 ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-400 hover:bg-gray-50'}`}
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors leading-tight">
          {contact.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <MapPin size={12} className="text-gray-300 flex-shrink-0" />
          <span className="truncate">{contact.location}</span>
        </div>

        {contact.rating && (
          <div className="flex items-center gap-1.5 text-sm font-bold text-gray-800 mb-4">
            <div className="flex items-center text-yellow-400">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={10} fill={i < Math.floor(contact.rating!) ? 'currentColor' : 'none'} strokeWidth={3} />
               ))}
            </div>
            <span>{contact.rating}</span>
            <span className="text-gray-300 font-medium">({contact.reviewsCount})</span>
          </div>
        )}

        <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-2">
          {contact.description}
        </p>
      </div>

      <div className="p-5 pt-0 mt-auto">
        <div className="flex gap-2.5">
          <button 
            onClick={() => onCall(contact.phone)}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100"
          >
            <Phone size={16} />
            <span className="text-sm">Appeler</span>
          </button>
          
          {showWhatsApp && (
            <button 
              onClick={() => onWhatsApp(getWhatsAppNumber())}
              className="px-4 border-2 border-green-50 text-green-600 rounded-xl flex items-center justify-center hover:bg-green-50 hover:border-green-100 active:scale-95 transition-all relative group/wa"
              title="Contacter sur WhatsApp"
            >
              <MessageCircle size={20} fill="currentColor" className="opacity-10" />
              <MessageCircle size={20} className="absolute" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
