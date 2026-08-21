import {
    GraduationCap, Brain, Zap, Beaker, Building2, Backpack,
    Code, Bot, Shield, FileText, Palette, Globe,
    Briefcase, Heart, Plane
} from 'lucide-react';

export const ICONS = {
    'graduation-cap': GraduationCap,
    brain: Brain,
    zap: Zap,
    beaker: Beaker,
    'building-2': Building2,
    backpack: Backpack,
    code: Code,
    bot: Bot,
    shield: Shield,
    'file-text': FileText,
    palette: Palette,
    globe: Globe,
    briefcase: Briefcase,
    heart: Heart,
    plane: Plane
};

export function getIcon(iconId) {
    return ICONS[iconId];
}
