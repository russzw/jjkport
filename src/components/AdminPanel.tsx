import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trash2, LayoutDashboard, User, Zap, Briefcase, Code, MessageSquare, BookOpen, Share2, Inbox, Mail, MailOpen } from 'lucide-react';
import { PortfolioData, ContactMessage } from '../types/portfolio';
import { subscribeToMessages, markMessageRead, deleteMessage } from '../lib/firestore';

interface AdminPanelProps {
  data: PortfolioData;
  onSave: (data: PortfolioData) => void;
  onClose: () => void;
}

type TabType = 'messages' | 'hero' | 'about' | 'skills' | 'experience' | 'projects' | 'testimonials' | 'journal' | 'contact';

const TABS = [
  { id: 'messages', label: 'Transmissions', icon: Inbox },
  { id: 'hero', label: 'Hero Domain', icon: LayoutDashboard },
  { id: 'about', label: 'Vessel Info', icon: User },
  { id: 'skills', label: 'Techniques', icon: Zap },
  { id: 'experience', label: 'Chronicles', icon: Briefcase },
  { id: 'projects', label: 'Manifestations', icon: Code },
  { id: 'testimonials', label: 'Void Echoes', icon: MessageSquare },
  { id: 'journal', label: 'Grimoire', icon: BookOpen },
  { id: 'contact', label: 'Channels', icon: Share2 },
] as const;

export default function AdminPanel({ data: initialData, onSave, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [data, setData] = useState<PortfolioData>(initialData);

  useEffect(() => {
    const unsub = subscribeToMessages(setMessages);
    return () => unsub();
  }, []);

  useEffect(() => {
    // Debounce the global save to prevent massive React re-renders and Firebase writes on every keystroke
    const timer = setTimeout(() => {
      onSave(data);
    }, 500);
    return () => clearTimeout(timer);
  }, [data, onSave]);

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-bg/95 backdrop-blur-xl overflow-hidden flex flex-col md:flex-row"
    >
      {/* SIDEBAR */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-black/20 p-6 flex flex-col h-auto md:h-full shrink-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-display uppercase tracking-widest text-accent flex items-center gap-2">
            <div className="w-4 h-4 bg-accent animate-spin-slow rotate-45" />
            Scroll Editor
          </h1>
          <button onClick={onClose} className="text-text hover:text-accent transition-colors md:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-2 pb-4 md:pb-0 scrollbar-hide">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-3 px-4 py-3 text-left transition-all whitespace-nowrap md:whitespace-normal ${
                activeTab === tab.id 
                  ? 'bg-accent/10 border-l-2 border-accent text-accent' 
                  : 'text-text/60 hover:bg-white/5 hover:text-text'
              }`}
            >
              <tab.icon size={16} />
              <span className="text-xs font-sans tracking-widest uppercase">{tab.label}</span>
              {tab.id === 'messages' && unreadCount > 0 && (
                <span className="ml-auto bg-accent text-bg text-[0.6rem] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="hidden md:block pt-6 border-t border-border mt-auto">
          <button onClick={onClose} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors border border-red-500/20 jjk-button">
            <X size={16} />
            <span className="text-xs uppercase tracking-widest font-bold">Seal Domain</span>
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-12 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* === MESSAGES TAB === */}
              {activeTab === 'messages' && (
                <section>
                  <h3 className="section-label text-accent mb-6 font-bold">// INTERCEPTED TRANSMISSIONS</h3>
                  {messages.length === 0 ? (
                    <div className="glass-panel p-12 text-center text-text/40 font-sans tracking-widest uppercase">
                      No incoming transmissions
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map(msg => (
                        <div key={msg.id} className={`glass-panel p-6 relative group transition-colors ${!msg.read ? 'border-accent/50 bg-accent/5' : ''}`}>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-display text-lg flex items-center gap-2">
                                {!msg.read && <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
                                {msg.name}
                              </h4>
                              <a href={`mailto:${msg.email}`} className="text-xs text-accent hover:underline">{msg.email}</a>
                            </div>
                            <div className="flex items-center gap-3 text-xs opacity-50">
                              {new Date(msg.createdAt).toLocaleString()}
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {!msg.read && (
                                  <button onClick={() => markMessageRead(msg.id!)} className="hover:text-accent" title="Mark Read">
                                    <MailOpen size={16} />
                                  </button>
                                )}
                                <button onClick={() => deleteMessage(msg.id!)} className="hover:text-red-500" title="Delete">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                          <p className="font-sans text-sm opacity-80 whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* === HERO TAB === */}
              {activeTab === 'hero' && (
                <section>
                  <h3 className="section-label text-accent mb-6 font-bold">// HERO OVERRIDE</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">First Name</label>
                      <input value={data.hero.name} onChange={e => onSave({...data, hero: {...data.hero, name: e.target.value}})} className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">Last Name</label>
                      <input value={data.hero.surname} onChange={e => setData({...data, hero: {...data.hero, surname: e.target.value}})} className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">Title</label>
                      <input value={data.hero.title} onChange={e => setData({...data, hero: {...data.hero, title: e.target.value}})} className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">Role (Subtitle)</label>
                      <input value={data.hero.role} onChange={e => setData({...data, hero: {...data.hero, role: e.target.value}})} className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">Japanese Quote</label>
                      <input value={data.hero.jpQuote} onChange={e => setData({...data, hero: {...data.hero, jpQuote: e.target.value}})} className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent font-japanese" />
                    </div>
                  </div>
                </section>
              )}

              {/* === ABOUT TAB === */}
              {activeTab === 'about' && (
                <section>
                  <h3 className="section-label text-accent mb-6 font-bold">// VESSEL DATA</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">JJK Themed Bio</label>
                      <textarea value={data.about.bio} onChange={e => setData({...data, about: {...data.about, bio: e.target.value}})} rows={4} className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent resize-none" />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">Real Professional Bio</label>
                      <textarea value={data.about.realBio} onChange={e => setData({...data, about: {...data.about, realBio: e.target.value}})} rows={4} className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent resize-none" />
                    </div>
                    
                    <div className="pt-6">
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-4">Vessel Stats</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.about.stats.map((stat, idx) => (
                          <div key={idx} className="glass-panel p-4 space-y-2">
                            <input value={stat.val} onChange={e => {
                              const newStats = [...data.about.stats];
                              newStats[idx].val = e.target.value;
                              setData({...data, about: {...data.about, stats: newStats}});
                            }} className="w-full bg-transparent text-xl font-display text-accent outline-none text-center" />
                            <input value={stat.label} onChange={e => {
                              const newStats = [...data.about.stats];
                              newStats[idx].label = e.target.value;
                              setData({...data, about: {...data.about, stats: newStats}});
                            }} className="w-full bg-transparent text-[0.6rem] uppercase tracking-widest opacity-50 outline-none text-center" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* === SKILLS TAB === */}
              {activeTab === 'skills' && (
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="section-label text-accent font-bold mb-0">// CURSED TECHNIQUES</h3>
                    <button onClick={() => setData({...data, skills: [...data.skills, {title: 'New Category', desc: 'Description', skills: []}]})} className="flex items-center gap-2 text-xs bg-accent/20 text-accent px-4 py-2 hover:bg-accent hover:text-bg transition-all">
                      <Plus size={14} /> Add Category
                    </button>
                  </div>
                  <div className="space-y-8">
                    {data.skills.map((category, cIdx) => (
                      <div key={cIdx} className="glass-panel p-6 border-l-2 border-l-accent relative group">
                        <button onClick={() => setData({...data, skills: data.skills.filter((_, i) => i !== cIdx)})} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                        
                        <div className="space-y-4 mb-4">
                          <input value={category.title} onChange={e => {
                            const updated = [...data.skills]; updated[cIdx].title = e.target.value; setData({...data, skills: updated});
                          }} className="bg-transparent text-xl font-display w-full outline-none text-accent" />
                          <input value={category.desc} onChange={e => {
                            const updated = [...data.skills]; updated[cIdx].desc = e.target.value; setData({...data, skills: updated});
                          }} className="bg-transparent text-sm opacity-60 w-full outline-none" />
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {category.skills.map((skill, sIdx) => (
                            <div key={sIdx} className="flex items-center bg-white/5 border border-border">
                              <input value={skill} onChange={e => {
                                const updated = [...data.skills]; updated[cIdx].skills[sIdx] = e.target.value; setData({...data, skills: updated});
                              }} className="bg-transparent p-2 text-xs outline-none w-24" />
                              <button onClick={() => {
                                const updated = [...data.skills]; updated[cIdx].skills = updated[cIdx].skills.filter((_, i) => i !== sIdx); setData({...data, skills: updated});
                              }} className="p-2 text-red-500 hover:bg-red-500/20"><X size={12} /></button>
                            </div>
                          ))}
                          <button onClick={() => {
                            const updated = [...data.skills]; updated[cIdx].skills.push('New Skill'); setData({...data, skills: updated});
                          }} className="px-3 py-2 text-xs border border-dashed border-border hover:border-accent text-accent transition-colors"><Plus size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* === EXPERIENCE TAB === */}
              {activeTab === 'experience' && (
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="section-label text-accent font-bold mb-0">// CHRONICLES</h3>
                    <button onClick={() => setData({...data, experience: [{period: '2025 - Present', role: 'Role', company: 'Company', achievements: ['Did something'] }, ...data.experience]})} className="flex items-center gap-2 text-xs bg-accent/20 text-accent px-4 py-2 hover:bg-accent hover:text-bg transition-all">
                      <Plus size={14} /> Add Role
                    </button>
                  </div>
                  <div className="space-y-6">
                    {data.experience.map((exp, eIdx) => (
                      <div key={eIdx} className="glass-panel p-6 relative group">
                        <button onClick={() => setData({...data, experience: data.experience.filter((_, i) => i !== eIdx)})} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pr-8">
                          <input value={exp.role} placeholder="Role" onChange={e => {
                            const updated = [...data.experience]; updated[eIdx].role = e.target.value; setData({...data, experience: updated});
                          }} className="bg-white/5 border border-border p-3 text-sm outline-none focus:border-accent font-bold" />
                          <input value={exp.company} placeholder="Company" onChange={e => {
                            const updated = [...data.experience]; updated[eIdx].company = e.target.value; setData({...data, experience: updated});
                          }} className="bg-white/5 border border-border p-3 text-sm outline-none focus:border-accent text-accent" />
                          <input value={exp.period} placeholder="Period" onChange={e => {
                            const updated = [...data.experience]; updated[eIdx].period = e.target.value; setData({...data, experience: updated});
                          }} className="bg-white/5 border border-border p-3 text-sm outline-none focus:border-accent" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[0.6rem] uppercase opacity-50 tracking-widest">Achievements / Responsibilities</label>
                          {exp.achievements.map((ach, aIdx) => (
                            <div key={aIdx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              <input value={ach} onChange={e => {
                                const updated = [...data.experience]; updated[eIdx].achievements[aIdx] = e.target.value; setData({...data, experience: updated});
                              }} className="flex-1 bg-transparent border-b border-white/10 p-2 text-sm outline-none focus:border-accent" />
                              <button onClick={() => {
                                const updated = [...data.experience]; updated[eIdx].achievements = updated[eIdx].achievements.filter((_, i) => i !== aIdx); setData({...data, experience: updated});
                              }} className="text-red-500 hover:text-red-400 p-2"><X size={14} /></button>
                            </div>
                          ))}
                          <button onClick={() => {
                            const updated = [...data.experience]; updated[eIdx].achievements.push('New Achievement'); setData({...data, experience: updated});
                          }} className="mt-2 text-xs text-accent hover:underline flex items-center gap-1"><Plus size={12}/> Add Bullet</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* === PROJECTS TAB === */}
              {activeTab === 'projects' && (
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="section-label text-accent font-bold mb-0">// MANIFESTATIONS</h3>
                    <button onClick={() => setData({...data, projects: [{id: 'new', title: 'New Project', type: 'App Type', desc: 'Description', stack: ['React'] }, ...data.projects]})} className="flex items-center gap-2 text-xs bg-accent/20 text-accent px-4 py-2 hover:bg-accent hover:text-bg transition-all">
                      <Plus size={14} /> Add Project
                    </button>
                  </div>
                  <div className="space-y-6">
                    {data.projects.map((proj, pIdx) => (
                      <div key={pIdx} className="glass-panel p-6 relative group">
                        <button onClick={() => setData({...data, projects: data.projects.filter((_, i) => i !== pIdx)})} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
                          <div>
                            <label className="text-[0.6rem] uppercase opacity-50 tracking-widest block mb-1">Image ID (for /images/project-ID.png)</label>
                            <input value={proj.id} onChange={e => {
                              const updated = [...data.projects]; updated[pIdx].id = e.target.value; setData({...data, projects: updated});
                            }} className="w-full bg-white/5 border border-border p-3 text-sm outline-none focus:border-accent" />
                          </div>
                          <div>
                            <label className="text-[0.6rem] uppercase opacity-50 tracking-widest block mb-1">Type</label>
                            <input value={proj.type} onChange={e => {
                              const updated = [...data.projects]; updated[pIdx].type = e.target.value; setData({...data, projects: updated});
                            }} className="w-full bg-white/5 border border-border p-3 text-sm outline-none focus:border-accent text-accent" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-[0.6rem] uppercase opacity-50 tracking-widest block mb-1">Title</label>
                            <input value={proj.title} onChange={e => {
                              const updated = [...data.projects]; updated[pIdx].title = e.target.value; setData({...data, projects: updated});
                            }} className="w-full bg-white/5 border border-border p-3 text-xl font-bold outline-none focus:border-accent" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-[0.6rem] uppercase opacity-50 tracking-widest block mb-1">Description</label>
                            <textarea value={proj.desc} rows={2} onChange={e => {
                              const updated = [...data.projects]; updated[pIdx].desc = e.target.value; setData({...data, projects: updated});
                            }} className="w-full bg-white/5 border border-border p-3 text-sm outline-none focus:border-accent resize-none" />
                          </div>
                          <div>
                            <label className="text-[0.6rem] uppercase opacity-50 tracking-widest block mb-1">Demo URL (Optional)</label>
                            <input value={proj.demoUrl || ''} onChange={e => {
                              const updated = [...data.projects]; updated[pIdx].demoUrl = e.target.value; setData({...data, projects: updated});
                            }} className="w-full bg-white/5 border border-border p-3 text-sm outline-none focus:border-accent" placeholder="https://" />
                          </div>
                          <div>
                            <label className="text-[0.6rem] uppercase opacity-50 tracking-widest block mb-1">Repository URL (Optional)</label>
                            <input value={proj.repoUrl || ''} onChange={e => {
                              const updated = [...data.projects]; updated[pIdx].repoUrl = e.target.value; setData({...data, projects: updated});
                            }} className="w-full bg-white/5 border border-border p-3 text-sm outline-none focus:border-accent" placeholder="https://" />
                          </div>
                        </div>

                        <div>
                          <label className="text-[0.6rem] uppercase opacity-50 tracking-widest block mb-2">Tech Stack</label>
                          <div className="flex flex-wrap gap-2">
                            {proj.stack.map((tech, sIdx) => (
                              <div key={sIdx} className="flex items-center bg-accent/10 border border-accent/20 text-accent text-xs">
                                <input value={tech} onChange={e => {
                                  const updated = [...data.projects]; updated[pIdx].stack[sIdx] = e.target.value; setData({...data, projects: updated});
                                }} className="bg-transparent p-2 outline-none w-20 text-center" />
                                <button onClick={() => {
                                  const updated = [...data.projects]; updated[pIdx].stack = updated[pIdx].stack.filter((_, i) => i !== sIdx); setData({...data, projects: updated});
                                }} className="p-2 hover:bg-accent hover:text-bg transition-colors"><X size={10} /></button>
                              </div>
                            ))}
                            <button onClick={() => {
                              const updated = [...data.projects]; updated[pIdx].stack.push('New Tech'); setData({...data, projects: updated});
                            }} className="px-3 py-1 text-xs border border-dashed border-border hover:border-accent text-accent transition-colors"><Plus size={14} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* === TESTIMONIALS TAB === */}
              {activeTab === 'testimonials' && (
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="section-label text-accent font-bold mb-0">// VOID ECHOES</h3>
                    <button onClick={() => setData({...data, testimonials: [{name: 'Name', role: 'Role', text: 'Quote content'}, ...data.testimonials]})} className="flex items-center gap-2 text-xs bg-accent/20 text-accent px-4 py-2 hover:bg-accent hover:text-bg transition-all">
                      <Plus size={14} /> Add Testimonial
                    </button>
                  </div>
                  <div className="space-y-4">
                    {data.testimonials.map((t, idx) => (
                      <div key={idx} className="glass-panel p-6 flex flex-col gap-4 relative group">
                        <button onClick={() => setData({...data, testimonials: data.testimonials.filter((_, i) => i !== idx)})} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                        <div className="grid grid-cols-2 gap-4 pr-8">
                          <input value={t.name} onChange={e => {
                            const updated = [...data.testimonials]; updated[idx].name = e.target.value; setData({...data, testimonials: updated});
                          }} className="bg-white/5 p-3 text-sm outline-none border border-border focus:border-accent" placeholder="Name" />
                          <input value={t.role} onChange={e => {
                            const updated = [...data.testimonials]; updated[idx].role = e.target.value; setData({...data, testimonials: updated});
                          }} className="bg-white/5 p-3 text-sm outline-none border border-border focus:border-accent" placeholder="Role" />
                        </div>
                        <textarea value={t.text} onChange={e => {
                          const updated = [...data.testimonials]; updated[idx].text = e.target.value; setData({...data, testimonials: updated});
                        }} className="bg-white/5 p-4 text-sm italic opacity-80 w-full outline-none resize-none border border-border focus:border-accent" rows={3} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* === JOURNAL TAB === */}
              {activeTab === 'journal' && (
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="section-label text-accent font-bold mb-0">// THE GRIMOIRE</h3>
                    <button onClick={() => setData({...data, journal: [{date: 'New Date', title: 'New Entry', excerpt: 'Start writing...'}, ...data.journal]})} className="flex items-center gap-2 text-xs bg-accent/20 text-accent px-4 py-2 hover:bg-accent hover:text-bg transition-all">
                      <Plus size={14} /> Add Entry
                    </button>
                  </div>
                  <div className="space-y-4">
                    {data.journal.map((post, idx) => (
                      <div key={idx} className="glass-panel p-6 flex flex-col gap-4 relative group">
                        <button onClick={() => setData({...data, journal: data.journal.filter((_, i) => i !== idx)})} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                        <input value={post.date} onChange={e => {
                          const updated = [...data.journal]; updated[idx].date = e.target.value; setData({...data, journal: updated});
                        }} className="bg-transparent text-accent text-xs font-bold w-full outline-none" />
                        <input value={post.title} onChange={e => {
                          const updated = [...data.journal]; updated[idx].title = e.target.value; setData({...data, journal: updated});
                        }} className="bg-transparent text-xl font-display w-full outline-none" />
                        <textarea value={post.excerpt} onChange={e => {
                          const updated = [...data.journal]; updated[idx].excerpt = e.target.value; setData({...data, journal: updated});
                        }} className="bg-transparent text-sm opacity-60 w-full outline-none resize-none border-b border-border/50 pb-2 mb-2" rows={2} placeholder="Short excerpt..." />
                        
                        <textarea value={post.content || ''} onChange={e => {
                          const updated = [...data.journal]; updated[idx].content = e.target.value; setData({...data, journal: updated});
                        }} className="bg-white/5 border border-border p-4 text-sm w-full outline-none resize-none focus:border-accent" rows={6} placeholder="Full article content (Markdown/Text)..." />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* === CONTACT TAB === */}
              {activeTab === 'contact' && (
                <section>
                  <h3 className="section-label text-accent mb-6 font-bold">// CHANNELS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">Email Address</label>
                      <input value={data.contact.email} onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">GitHub Username</label>
                      <input value={data.contact.github} onChange={e => setData({...data, contact: {...data.contact, github: e.target.value}})} className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">LinkedIn Username</label>
                      <input value={data.contact.linkedin} onChange={e => setData({...data, contact: {...data.contact, linkedin: e.target.value}})} className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">Twitter / X Username</label>
                      <input value={data.contact.twitter} onChange={e => setData({...data, contact: {...data.contact, twitter: e.target.value}})} className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] uppercase tracking-widest opacity-50 mb-2">Instagram Username</label>
                      <input value={data.contact.instagram} onChange={e => setData({...data, contact: {...data.contact, instagram: e.target.value}})} className="w-full bg-white/5 border border-border p-4 outline-none focus:border-accent" />
                    </div>
                  </div>
                </section>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
