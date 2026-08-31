import { motion } from "framer-motion";
import {
  SidebarContent,
  SidebarStyle,
  SidebarTitle,
  SidebarTitleText,
  FloatingElement,
  CreativeCircle,
} from "./style";

import logoCl from "../../assets/images/logo-black.png";

const Sidebar = () => {
  return (
    <SidebarStyle>
      {/* Decorative Background Elements - Creative Circles */}
      <CreativeCircle $size="300px" $top="-50px" $right="-100px" $borderWidth="2px" $opacity={0.15} />
      <CreativeCircle $size="500px" $top="15%" $right="-250px" $borderWidth="1px" $opacity={0.1} />
      <CreativeCircle $size="120px" $top="65%" $right="40px" $borderWidth="3px" $opacity={0.15} />
      <CreativeCircle $size="650px" $top="50%" $right="-300px" $borderWidth="1px" $opacity={0.08} />
      
      <FloatingElement $top="10%" $left="-10%" $size="300px" $opacity={0.03} $delay={0} />
      <FloatingElement $top="60%" $right="-20%" $size="400px" $opacity={0.04} $delay={1} />
      <FloatingElement $top="40%" $left="60%" $size="150px" $opacity={0.05} $delay={2} />
      
      <SidebarTitle
        as={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div style={{ background: '#fff', borderRadius: '50%', padding: '2px', display: 'flex' }}>
          <img src={logoCl} alt="Logo Lara Charantola" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%' }} />
        </div>
        <SidebarTitleText>
          <h5 style={{ color: '#f5e6d3' }}>Lara Charantola</h5>
          <p style={{ color: '#f5e6d3', opacity: 0.9 }}>Aulas & Traduções</p>
        </SidebarTitleText>
      </SidebarTitle>
      
      <SidebarContent
        as={motion.div}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <h4 style={{ fontSize: '2.8rem', lineHeight: 1.2, marginBottom: '1.5rem', fontWeight: 800, color: '#f5e6d3' }}>
          Bem-vindo(a) à plataforma de ensino <span style={{ color: '#C57A67' }}>LC.</span>
        </h4>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.9, color: '#e2e8f0' }}>
          Acesse suas aulas personalizadas, acompanhe seu progresso, realize exercícios práticos e conquiste a fluência no idioma de forma moderna e organizada.
        </p>
      </SidebarContent>
    </SidebarStyle>
  );
};

export default Sidebar;
