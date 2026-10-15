import {
    GraduationCap, Brain, Zap, Beaker, Building2, Backpack,
    Code, Bot, Shield, FileText, Palette, Globe,
    Briefcase, Heart, Plane, Box
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
    // Same generic fallback as getModuleIcon: a wrong DOMAIN_ICON_IDS entry
    // degrades to a neutral icon instead of crashing DomainSwitcher (Phase 17.8).
    return ICONS[iconId] || Box;
}
