import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import { liveApps } from './data/projects';

const tabOrder = ['home', 'projects', 'experience', 'live-apps', 'contact'];

const PROJECTS_DATA = [
  {
    id: "ethos-style",
    title: "EthosStyle AI",
    category: "Data Science & AI",
    description: "Multi-modal hybrid recommendation system for sustainable fashion utilizing ResNet-50, Sentence-BERT, and MORS logic.",
    tags: ["ResNet-50", "S-BERT", "MORS", "PySpark", "Delta Lake"],
    featured: true,
    context: "Building a scalable AI to bridge the gap between user intent and visual inventory in fashion retail.",
    implementation: ["Delta Lake Medallion architecture", "Vector Search with Pinecone", "Azure Databricks orchestration"],
    methodology: ["Multi-modal fusion", "Collaborative filtering", "A/B testing"]
  },
  {
    id: "policy-nexus",
    title: "Policy Nexus",
    category: "GenAI & Automation",
    description: "Agentic data orchestration for complex insurance policy analysis.",
    tags: ["LangChain", "OpenAI", "Qdrant"],
    featured: false,
    context: "Simplifying complex insurance jargon through agentic retrieval.",
    implementation: ["RAG Architecture", "Vector Store with Qdrant", "LangGraph reasoning"],
    methodology: ["Chain-of-thought prompting", "Hybrid search", "Factual grounding"]
  },
  {
    id: "hr-policy-ai",
    title: "HR Policy AI",
    category: "NLP & Automation",
    description: "LLM assistant for instant HR policy query resolution.",
    tags: ["Python", "OpenAI", "Streamlit"],
    featured: false,
    context: "Reducing HR overhead by providing employees with instant, grounded answers.",
    implementation: ["Recursive character splitting", "FAISS vector store", "GPT-4o integration"],
    methodology: ["RAG Architecture", "Prompt engineering", "Semantic search"]
  },
  {
    id: "ecommerce-analytics",
    title: "Real-Time Analytics",
    category: "Streaming & CDC",
    description: "Streaming data pipeline for live sales tracking at 5k events/sec.",
    tags: ["Kafka", "Spark", "PostgreSQL"],
    featured: true,
    context: "Architecting a streaming pipeline to ingest 5,000+ events per second.",
    implementation: ["Apache Kafka ingestion", "Spark windowed aggregation", "K8s deployment"],
    methodology: ["Horizontal scalability", "Fault tolerance", "Real-time monitoring"]
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance",
    category: "Machine Learning",
    description: "Framework to predict component failures 48 hours in advance.",
    tags: ["Scikit-Learn", "XGBoost", "SQL"],
    featured: false,
    context: "Minimizing offshore downtime by predicting mechanical failure.",
    implementation: ["Time-series cross-validation", "Automated feature selection", "Flask API"],
    methodology: ["Survival analysis", "Random Forest", "Precision-Recall optimization"]
  },
  {
    id: "market-cluster",
    title: "Market Cluster AI",
    category: "Unsupervised ML",
    description: "Behavioral segmentation for targeted marketing campaigns.",
    tags: ["K-Means", "PCA", "Pandas"],
    featured: false,
    context: "Identifying niche customer personas using high-dimensional data.",
    implementation: ["Dimensionality reduction with PCA", "K-selection", "Silhouette validation"],
    methodology: ["Clustering analysis", "StandardScaling", "Behavioral mapping"]
  },
  {
    id: "global-sentiment",
    title: "Global Sentiment",
    category: "GenAI & NLP",
    description: "Real-time NLP pipeline for monitoring brand sentiment across APIs.",
    tags: ["BERT", "Kafka", "Python"],
    featured: false,
    context: "Processing millions of social mentions to provide real-time brand health metrics.",
    implementation: ["Kafka ingestion", "BERT classifier", "Tableau dashboard"],
    methodology: ["Multi-language BERT", "Contextual awareness", "Scalable pipeline"]
  },
  {
    id: "edge-inference",
    title: "Edge Inference Lab",
    category: "MLOps",
    description: "Optimizing and deploying ML models for low-power edge devices.",
    tags: ["ONNX", "Docker", "PyTorch"],
    featured: false,
    context: "Architecting optimized ML lifecycles for visual anomaly detection on edge hardware.",
    implementation: ["Model quantization", "Docker containerization", "Hardware acceleration"],
    methodology: ["MLOps pipeline", "Performance benchmarking", "Reliability testing"]
  },
  {
    id: "cyber-traffic",
    title: "Cyber Traffic AI",
    category: "Cybersecurity",
    description: "Network anomaly detection pipeline using unsupervised learning.",
    tags: ["Isolation Forest", "Elastic", "R"],
    featured: false,
    context: "Identifying zero-day attack vectors within network traffic.",
    implementation: ["Feature extraction", "Isolation Forest modeling", "Kibana dashboard"],
    methodology: ["Unsupervised ML", "Real-time alerting", "Forensics"]
  }
];

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" }
  }),
};

const scrollVariants = {
  initial: { 
    y: 30, 
    opacity: 0 
  },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    } 
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [direction, setDirection] = useState(0); 
  const [selectedProject, setSelectedProject] = useState(null);

  const handleTabChange = (newTab) => {
    if (newTab === 'contact') {
      const footer = document.getElementById('contact-footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    const newIndex = tabOrder.indexOf(newTab);
    const oldIndex = tabOrder.indexOf(activeTab);
    setDirection(newIndex > oldIndex ? 1 : -1);
    setActiveTab(newTab);
    setSelectedProject(null);
  };

  useEffect(() => {
    if (activeTab !== 'contact') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  // FIX: Scroll to top when a project is selected
  useEffect(() => {
    if (selectedProject) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProject]);

  const pageVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    exit: (direction) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }),
  };

  const renderContent = () => {
    const glassCardClass = "p-10 rounded-[40px] bg-white/80 backdrop-blur-xl border border-white/20 text-zinc-950 shadow-2xl transition-all duration-300";

    const Footer = () => (
      <motion.footer 
        id="contact-footer"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-20px" }}
        variants={scrollVariants}
        className="mt-32 pb-24 border-t border-white/5 pt-16 text-center"
      >
        <p className="text-[11px] uppercase tracking-[0.4em] text-white mb-4 font-medium">
          Contact
        </p>
        <div className="flex flex-col items-center space-y-0.5 mb-16">
          <div className="flex items-center gap-1 text-[14px] tracking-tight">
            <span className="text-white opacity-80">Email:</span>
            <a href="mailto:ms64995n@pace.edu" className="text-white hover:underline underline-offset-4 transition-all">
              ms64995n@pace.edu
            </a>
          </div>
          <div className="flex items-center gap-1 text-[14px] tracking-tight">
            <span className="text-white opacity-80">Phone:</span>
            <a href="tel:+12014230850" className="text-white hover:underline underline-offset-4 transition-all">
              +1 (201) 423-0850
            </a>
          </div>
        </div>
        <p className="text-[11px] text-white opacity-60 tracking-tight">
          © 2026 Mohanaprasath Subramaniyan.
        </p>
      </motion.footer>
    );

    switch (activeTab) {
      case 'home':
        return (
          <motion.div 
            key="home"
            custom={direction}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-7xl mx-auto px-6 pt-48 pb-24 relative z-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8">
                <motion.div variants={itemVariants} custom={direction} className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6 text-zinc-400 font-medium text-[11px] uppercase tracking-[0.4em] opacity-80">
                  <span>New York City</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                  <span>Data Scientist</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                  <span>M.S. Data Science</span>
                </motion.div>

                <motion.h1 variants={itemVariants} custom={direction} className="text-5xl md:text-[64px] font-extrabold text-white mb-8 tracking-[-0.04em] leading-[1.05] drop-shadow-sm">
                  Mohanaprasath<br />
                  Subramaniyan.
                </motion.h1>
                
                <motion.div variants={itemVariants} custom={direction} className="max-w-4xl mb-12">
                  <p className="text-lg md:text-[20px] text-zinc-300 leading-[1.6] font-normal tracking-tight">
                    I build production-oriented intelligent data ecosystems with a focus on scalability and MLOps. 
                    As a Data Scientist, I have architected multi-terabyte sensor pipelines that achieved a 40% reduction in reporting discrepancies, 
                    and engineered anomaly-detection frameworks that cut critical pipeline downtime by 20%. 
                    I specialize in transforming unstructured chaos into clear, actionable AI orchestration pipelines, 
                    bridging the gap between heavy data engineering and autonomous multi-agent systems.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} custom={direction} className="flex flex-wrap gap-3 mb-20">
                  <a href="https://www.linkedin.com/in/mohanaprasathsubramaniyan" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    LinkedIn
                  </a>
                  <a href="https://github.com/MohanaprasathSubramaniyan?tab=repositories" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    GitHub
                  </a>
                  <a href="https://huggingface.co/Mohanaprasath" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Hugging Face
                  </a>
                  <a href="/Mohan_resume.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Resume PDF
                  </a>
                  <button onClick={() => handleTabChange('projects')} className="px-6 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/20 text-zinc-950 text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                    View Projects →
                  </button>
                </motion.div>
              </div>

              <div className="lg:col-span-4 space-y-4 pt-12">
                <motion.div variants={itemVariants} custom={direction} className="p-8 rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-white">
                  <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-400 mb-4">Experience</p>
                  <p className="text-3xl font-extrabold tracking-[-0.04em]">2+ years</p>
                </motion.div>

                <motion.div variants={itemVariants} custom={direction} className="p-8 rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-white">
                  <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-400 mb-4">Core Focus</p>
                  <p className="text-xl font-extrabold leading-tight tracking-[-0.04em]">Data Scientist + AI Orchestration</p>
                </motion.div>

                <motion.div variants={itemVariants} custom={direction} className="p-8 rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl text-zinc-950">
                  <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-zinc-500 mb-4">Current Base</p>
                  <p className="text-3xl font-extrabold tracking-[-0.04em]">New York City</p>
                </motion.div>
              </div>
            </div>

            <div className="mb-32 mt-24">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                className="flex justify-between items-end mb-12"
              >
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-400 mb-2">Experience</p>
                  <h2 className="text-5xl font-extrabold text-white tracking-[-0.04em]">Work Experience</h2>
                </div>
                <button onClick={() => handleTabChange('experience')} className="px-8 py-3 rounded-full border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg">Full experience →</button>
              </motion.div>

              <div className="space-y-8">
                <motion.div 
                  variants={scrollVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-20px" }}
                  className={glassCardClass}
                >
                  <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
                    <div>
                      <h3 className="text-3xl font-extrabold tracking-[-0.04em] mb-1">Data Scientist | MODEC (Client)</h3>
                      <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.2em]">HESC (Employer)</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-lg font-extrabold text-zinc-900 tracking-[-0.04em]">India</p>
                      <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.1em]">Jan 2024 – Jul 2024</p>
                    </div>
                  </div>
                  <ul className="space-y-4 text-[15px] text-zinc-800 font-normal leading-relaxed tracking-tight w-full">
                    <li>• Optimized high-velocity ETL/ELT pipelines in Azure Databricks using PySpark, orchestrating the ingestion of multi-terabyte FPSO sensor data into a standardized Medallion architecture (Bronze, Silver, Gold layers) for real-time monitoring and advanced asset analytics.</li>
                    <li>• Developed sophisticated data modeling strategies within the Delta Lake environment, implementing schema enforcement and time-travel features to support predictive maintenance and reduce operational data redundancy by 30%.</li>
                    <li>• Built automated data quality frameworks using Python to validate multi-source schema consistency, identifying and resolving over 40% of reporting discrepancies before they reached critical stakeholder dashboards.</li>
                    <li>• Collaborated with cross-functional MLOps teams to integrate complex feature engineering into streaming workflows, facilitating the deployment of predictive failure models for high-value critical vessel components.</li>
                  </ul>
                </motion.div>

                <motion.div 
                  variants={scrollVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-20px" }}
                  className={glassCardClass}
                >
                  <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
                    <div>
                      <h3 className="text-3xl font-extrabold tracking-[-0.04em] mb-1">Data Scientist | Equinor (Client)</h3>
                      <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.2em]">HESC (Employer)</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-lg font-extrabold text-zinc-900 tracking-[-0.04em]">India</p>
                      <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.1em]">Aug 2023 – Dec 2023</p>
                    </div>
                  </div>
                  <ul className="space-y-4 text-[15px] text-zinc-800 font-normal leading-relaxed tracking-tight w-full">
                    <li>• Consolidated disparate production and maintenance data streams into a centralized Snowflake data warehouse, establishing a single source of truth for high-concurrency operational analytics across the global enterprise.</li>
                    <li>• Implemented proactive anomaly-detection monitoring for data ingestion pipelines, leveraging custom SQL alerting that improved system response time to data ingestion failures by 20%.</li>
                    <li>• Optimized complex SQL queries and partitioning strategies, leading to a 25% improvement in dashboard refresh rates and significantly reducing monthly compute costs for heavy analytical workloads.</li>
                    <li>• Spearheaded the automation of weekly performance reports, transitioning the business unit from manual Excel-based tracking to dynamic, real-time PowerBI visualizations.</li>
                  </ul>
                </motion.div>
              </div>
            </div>

            <div className="mb-24">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                className="flex justify-between items-end mb-12"
              >
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-400 mb-2">Portfolio</p>
                  <h2 className="text-5xl font-extrabold text-white tracking-[-0.04em]">Selected Projects</h2>
                </div>
                <button onClick={() => handleTabChange('projects')} className="px-8 py-3 rounded-full border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg">Browse all →</button>
              </motion.div>

              <div className="space-y-8">
                <motion.div 
                  variants={scrollVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-20px" }}
                  className={glassCardClass}
                >
                  <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
                    <div>
                      <h3 className="text-3xl font-extrabold tracking-[-0.04em] mb-1">EthosStyle AI</h3>
                      <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.2em]">Multi-modal Hybrid Recommendation System</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-lg font-extrabold text-zinc-900 tracking-[-0.04em]">Capstone Project</p>
                      <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.1em]">Pace University</p>
                    </div>
                  </div>
                  <ul className="space-y-4 text-[15px] text-zinc-800 font-normal leading-relaxed tracking-tight w-full">
                    <li>• Engineered a scalable Delta Lake solution within an Azure Databricks environment to handle high-velocity fashion retail data, implementing schema enforcement and time-travel features for full-history auditing and reproducibility.</li>
                    <li>• Developed complex transformations in Spark SQL to create aggregated business views, which significantly improved recommendation engine accuracy by reducing feature bias in the historical training set.</li>
                    <li>• Built a multi-modal training pipeline that incorporates visual embeddings and user clickstream metadata to deliver personalized product suggestions with a 15% higher conversion rate compared to baseline models.</li>
                  </ul>
                </motion.div>

                <motion.div 
                  variants={scrollVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-20px" }}
                  className={glassCardClass}
                >
                  <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
                    <div>
                      <h3 className="text-3xl font-extrabold tracking-[-0.04em] mb-1">Policy Nexus</h3>
                      <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.2em]">Agentic Data Orchestration Platform</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-lg font-extrabold text-zinc-900 tracking-[-0.04em]">GenAI Focus</p>
                      <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.1em]">LangGraph / Qdrant</p>
                    </div>
                  </div>
                  <ul className="space-y-4 text-[15px] text-zinc-800 font-normal leading-relaxed tracking-tight w-full">
                    <li>• Built a sophisticated multi-agent data pipeline using LangGraph that autonomously orchestrates the retrieval and synthesis of data from unstructured PDF stores and live legal APIs for enterprise compliance.</li>
                    <li>• Implemented a high-performance hybrid search architecture combining vector embeddings (Qdrant) and keyword-based search to optimize retrieval latency to sub-second levels for complex legal queries.</li>
                    <li>• Designed an automated evaluation framework to monitor the factual accuracy of LLM-generated summaries, reducing hallucination rates by 25% through iterative prompt engineering and RAG optimization.</li>
                  </ul>
                </motion.div>
              </div>
            </div>

            <Footer />
          </motion.div>
        );

      case 'projects':
        return (
          <motion.div 
            key="projects" 
            custom={direction}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-7xl mx-auto pt-48 px-6 pb-20 relative z-10"
          >
            <AnimatePresence mode="wait">
              {!selectedProject ? (
                <motion.div key="grid" variants={containerVariants} initial="initial" animate="animate" exit="exit">
                  <motion.div variants={itemVariants} custom={direction} className="mb-20">
                    <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-white/40 mb-3">Architectural Showcase</p>
                    <h2 className="text-7xl font-extrabold text-white tracking-[-0.05em] mb-6">Project Lab.</h2>
                    <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed font-light">Production-grade systems specializing in large-scale data orchestration and autonomous AI.</p>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
                    {PROJECTS_DATA.map((proj, index) => {
                      const isLarge = proj.featured || index === 0 || index === 3;
                      return (
                        <motion.div 
                          key={proj.id}
                          variants={itemVariants}
                          custom={direction}
                          layoutId={proj.id}
                          onClick={() => setSelectedProject(proj)}
                          className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900 hover:border-white/30 transition-colors duration-500 cursor-pointer flex flex-col p-8 justify-between shadow-2xl ${isLarge ? 'md:col-span-8' : 'md:col-span-4'}`}
                          whileHover={{ y: -5 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
                          <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white/80 transition-colors px-3 py-1 rounded-full border border-white/10 bg-white/5">{proj.category}</span>
                              <div className="text-white/20 group-hover:text-white transition-all transform translate-x-1 group-hover:translate-x-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                              </div>
                            </div>
                            {/* UPDATED: Removed group-hover:italic */}
                            <h3 className={`font-extrabold text-white tracking-tighter mb-3 leading-none transition-all duration-500 ${isLarge ? 'text-5xl' : 'text-3xl'}`}>{proj.title}</h3>
                            <p className="text-zinc-400 text-sm max-w-sm font-light leading-relaxed line-clamp-2">{proj.description}</p>
                          </div>
                          <div className="relative z-10 flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                            <div className="flex gap-3">
                              {proj.tags.slice(0, 3).map(tag => <span key={tag} className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">{tag}</span>)}
                            </div>
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">Technicals →</span>
                          </div>
                          <div className="absolute -bottom-6 -right-6 text-[180px] font-black text-white/[0.02] group-hover:text-white/[0.04] transition-all">{proj.title.charAt(0)}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="detail" layoutId={selectedProject.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto text-white relative">
                  
                  <div className="fixed top-48 left-0 right-0 z-50 pointer-events-none flex justify-center px-6">
                    <div className="w-full max-w-6xl flex justify-end">
                      <div className="flex flex-col gap-3 pointer-events-auto w-40">
                        <button onClick={() => setSelectedProject(null)} className="group flex items-center justify-between bg-zinc-900/90 backdrop-blur-md border border-white/20 text-zinc-300 px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-2xl w-full">
                          <svg className="transform group-hover:-translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                          <span>Back to Lab</span>
                        </button>
                        
                        <a href="#" className="group flex items-center justify-between bg-zinc-200 text-zinc-950 px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-zinc-300 hover:scale-105 transition-all shadow-2xl w-full">
                            <span>Repository</span> 
                            <svg className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                        </a>
                        <a href="#" className="group flex items-center justify-between bg-zinc-200 text-zinc-950 px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-zinc-300 hover:scale-105 transition-all shadow-2xl w-full">
                            <span>Live Link</span> 
                            <svg className="group-hover:scale-110 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mb-16 max-w-3xl">
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[11px] mb-3">{selectedProject.category}</p>
                    {/* UPDATED: Removed italic */}
                    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[0.9]">{selectedProject.title}</h1>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tags.map(tag => <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase text-zinc-400">{tag}</span>)}
                    </div>
                  </div>

                  {/* UPDATED: Conditionally Rendered Architecture Diagram */}
                  <div className="mb-20">
                    <h4 className="text-white/20 font-black uppercase text-[12px] mb-6 tracking-[0.5em] ml-2">Architecture</h4>
                    <div className="w-full h-[400px] bg-zinc-900 rounded-[48px] border border-white/10 overflow-hidden flex items-center justify-center relative shadow-2xl group">
                       {selectedProject.id === 'ethos-style' ? (
                         <img 
                           src="/image.png" 
                           alt={`${selectedProject.title} Architecture Diagram`} 
                           className="w-full h-full object-cover p-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500 relative z-10"
                         />
                       ) : (
                         <span className="text-zinc-700 font-bold uppercase tracking-widest text-[10px]">Diagram Pending</span>
                       )}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-[1fr_300px] gap-16">
                    <div className="space-y-12 bg-zinc-900 p-12 rounded-[40px] border border-white/10">
                      <section>
                        <h4 className="text-white/20 font-black uppercase text-[12px] mb-6 tracking-[0.5em]">Context</h4>
                        <p className="text-zinc-300 leading-relaxed text-lg font-light">
                          {
                            selectedProject.id === "ethos-style" ? "EthosStyle AI is a Multi-Modal Hybrid Recommender System designed to solve the 'Cold Start' and 'Single-Objective' problems in fashion retail. By merging 31 million rows of historical transaction data with real-time visual and semantic deep learning, it makes new, sustainable inventory instantly discoverable without relying solely on click-through rates." :
                            selectedProject.title.includes("Predictive") ? "High-value manufacturing relies on continuous uptime. Unplanned downtime costs millions. This framework leverages historical sensor data to predict mechanical failures 48 hours before they occur, allowing for scheduled maintenance rather than emergency repairs." :
                            selectedProject.title.includes("Cluster") ? "A retail client needed to move away from demographic-based marketing to behavioral marketing. Market Cluster AI is an unsupervised learning pipeline that segments millions of customers based on their actual purchasing patterns, engagement metrics, and lifetime value." :
                            selectedProject.title.includes("Sentiment") ? "Managing global brand reputation requires instant awareness. This real-time NLP pipeline ingests thousands of social media posts and reviews per minute, scoring them for sentiment and extracting key topics to alert PR teams of emerging crises." :
                            selectedProject.title.includes("Edge") ? "Cloud inference is too slow and expensive for real-time robotic vision. Edge Inference Lab focused on compressing heavy deep learning models so they can run locally on low-power, resource-constrained IoT devices without sacrificing accuracy." :
                            selectedProject.title.includes("Cyber") ? "Rule-based firewalls fail against zero-day exploits. Cyber Traffic AI serves as a secondary defense layer, utilizing unsupervised machine learning to establish a baseline of 'normal' network behavior and flagging statistical anomalies indicative of an intrusion." :
                            selectedProject.id === "policy-nexus" ? "Policy Nexus tackles the massive operational bottleneck of manual insurance claims processing. Adjusters typically spend hours cross-referencing multi-hundred-page policy PDFs. This Agentic Data Orchestration platform transforms static documents into an interactive knowledge graph." :
                            selectedProject.id === "ecommerce-analytics" ? "Real-Time Analytics addresses the 'stale data' problem in high-volume retail. Traditional batch processing prevents immediate reactions to flash sales. This streaming pipeline is engineered to ingest 5,000+ events per second for sub-second latency tracking." :
                            selectedProject.id === "hr-policy-ai" ? "HR Policy AI was conceptualized to eliminate the administrative friction of repetitive employee inquiries. This GenAI assistant utilizes a rigorous RAG architecture to provide employees with instant, accurate answers grounded in official company documentation." :
                            selectedProject.description || "Project context is currently being updated."
                          }
                        </p>
                      </section>

                      <section>
                        <h4 className="text-white/20 font-black uppercase text-[12px] mb-6 tracking-[0.5em]">Execution</h4>
                        <ul className="space-y-6">
                          {(
                            selectedProject.id === "ethos-style" ? [
                              "Built a 'Two Brains' Architecture: The Historian (Collaborative Filtering on 31M rows of H&M data) and The Visionary (Multi-Modal Deep Learning).",
                              "Extracted visual features into 2048-D vectors using ResNet-50 and semantic text descriptions into 384-D vectors using Sentence-BERT.",
                              "Mapped embeddings into a shared Latent Space to calculate Cosine Similarity for zero-history item-matching.",
                              "Implemented a Multi-Objective Recommender System (MORS) to re-rank results based on sustainability metrics.",
                              "Deployed the optimized model via a FastAPI backend and a React.js frontend featuring Explainable AI (XAI) transparency."
                            ] : 
                            selectedProject.title.includes("Predictive") ? [
                              "Ingested terabytes of historical IoT sensor telemetry via SQL pipelines.",
                              "Engineered time-domain and frequency-domain features to capture vibrational anomalies.",
                              "Trained XGBoost and Random Forest models with SMOTE to handle highly imbalanced failure classes.",
                              "Deployed a Flask API to serve real-time health scores to factory dashboards."
                            ] :
                            selectedProject.title.includes("Cluster") ? [
                              "Cleaned and normalized transactional data for over 5 million customers using Pandas.",
                              "Applied Principal Component Analysis (PCA) to reduce feature dimensionality and eliminate noise.",
                              "Implemented K-Means clustering with the Elbow Method and Silhouette Analysis to determine optimal customer segments.",
                              "Built an automated pipeline to re-cluster users weekly based on rolling 30-day behaviors."
                            ] :
                            selectedProject.title.includes("Sentiment") ? [
                              "Set up Apache Kafka streams to ingest real-time data from Twitter and News APIs.",
                              "Fine-tuned a pre-trained BERT model for domain-specific sentiment classification.",
                              "Implemented Named Entity Recognition (NER) to track specific product mentions within the text.",
                              "Visualized rolling sentiment scores on a live operational dashboard."
                            ] :
                            selectedProject.title.includes("Edge") ? [
                              "Converted heavy PyTorch computer vision models into the ONNX format for cross-platform compatibility.",
                              "Applied post-training quantization to reduce model weights from 32-bit float to 8-bit integer.",
                              "Containerized the optimized inference engine using Docker for seamless deployment to edge devices.",
                              "Built a CI/CD pipeline to automate model evaluation and deployment updates."
                            ] :
                            selectedProject.title.includes("Cyber") ? [
                              "Aggregated VPC flow logs and packet metadata into an Elastic Stack (ELK).",
                              "Engineered features capturing connection duration, byte transfer rates, and port usage.",
                              "Trained an Isolation Forest algorithm to detect multi-dimensional outliers in network traffic.",
                              "Integrated anomaly alerts directly into the security operations center (SOC) Slack channel."
                            ] :
                            selectedProject.id === "policy-nexus" ? [
                              "Data Ingestion Pipeline: Built robust PDF parsers to extract text, tables, and hierarchical metadata from complex insurance documents.",
                              "Hybrid Search Infrastructure: Configured Qdrant to handle both dense vector (semantic intent) and sparse keyword (exact legal terminology) search.",
                              "Agentic Workflow: Orchestrated a multi-agent system using LangGraph for specialized retrieval, synthesis, and verification tasks.",
                              "Schema-First Output: Enforced structured JSON outputs using function calling to ensure responses were usable by downstream claims systems."
                            ] : 
                            selectedProject.id === "ecommerce-analytics" ? [
                              "Event Ingestion: Configured Apache Kafka clusters to handle high-throughput, distributed event ingestion without data loss.",
                              "Stream Processing: Implemented Spark Structured Streaming to perform real-time windowed aggregations.",
                              "Medallion Architecture: Designed a Delta Lake storage layer (Bronze, Silver, Gold) optimized for high-velocity time-series inserts.",
                              "Real-Time Dashboarding: Connected the Gold layer to Grafana for sub-second latency visualization of key business metrics."
                            ] : 
                            selectedProject.id === "hr-policy-ai" ? [
                              "Document Processing: Deployed Recursive Character Splitting optimized for legal/HR documents to maintain context across paragraph breaks.",
                              "Vector Storage: Utilized FAISS as an in-memory vector store for lightning-fast, cost-effective document retrieval.",
                              "Prompt Engineering: Engineered custom 'Chain-of-Verification' wrappers to strictly limit the LLM's knowledge base to retrieved contexts.",
                              "Citation Enforcement: Built parsing logic to ensure every generated sentence includes a bracketed citation pointing to the exact source document."
                            ] :
                            selectedProject.implementation || ["Execution details pending update."]
                          ).map((it, i) => (
                            <li key={i} className="group flex gap-5 items-start">
                              <span className="text-white/20 font-black text-2xl group-hover:text-white/60 transition-colors mt-0.5">0{i+1}</span>
                              <p className="text-zinc-300 text-lg font-light leading-relaxed">{it}</p>
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section>
                        <h4 className="text-white/20 font-black uppercase text-[12px] mb-6 tracking-[0.5em]">Challenges & Outcome</h4>
                        <div className="space-y-6">
                           <p className="text-zinc-300 text-lg font-light leading-relaxed border-l-2 border-white/10 pl-6 italic">
                             {
                               selectedProject.id === "ethos-style" ? "Challenge: Traditional algorithms bury new, sustainable clothing as \"Dead Inventory\" and optimize only for engagement. Outcome: Developed a MORS logic [ Score = (Alpha × Style Similarity) + ((1 - Alpha) × Sustainability) ] to algorithmically nudge users toward greener choices, tracking success via MAP@12 and a custom Eco-Hit Ratio." :
                               selectedProject.title.includes("Predictive") ? "Challenge: Dealing with highly imbalanced datasets where failures are rare but critical. Outcome: Achieved 92% recall on critical component failures, reducing unplanned downtime by 35% and saving an estimated $1.2M annually." :
                               selectedProject.title.includes("Cluster") ? "Challenge: High-dimensional noise making distinct clustering difficult. Outcome: Identified 5 distinct behavioral cohorts, leading to a 22% increase in targeted campaign ROI and a 15% boost in customer retention." :
                               selectedProject.title.includes("Sentiment") ? "Challenge: Sarcasm and domain-specific slang confusing standard lexicon models. Outcome: Fine-tuned BERT improved accuracy by 40% over baselines, allowing PR teams to respond to negative trends 3 hours faster on average." :
                               selectedProject.title.includes("Edge") ? "Challenge: Balancing model compression with accuracy degradation. Outcome: Achieved a 4x reduction in model size and a 3x speedup in inference latency with less than a 1% drop in F1 score." :
                               selectedProject.title.includes("Cyber") ? "Challenge: High false positive rates causing alert fatigue for security analysts. Outcome: Tuned contamination parameters to reduce false positives by 60%, successfully flagging simulated exfiltration attempts in under 5 minutes." :
                               selectedProject.id === "policy-nexus" ? "Challenge: Preventing high-stakes AI hallucinations when interpreting dense legal text. Outcome: Reduced hallucination rates by 25% and accelerated claim review times by 60% using a multi-agent verification loop." :
                               selectedProject.id === "ecommerce-analytics" ? "Challenge: Managing event late-arrival, out-of-order data, and sudden traffic spikes. Outcome: Standardized real-time reporting with sub-second latency at 5k events/sec throughput, enabling dynamic pricing capabilities." :
                               selectedProject.id === "hr-policy-ai" ? "Challenge: Balancing LLM context window limits with multi-page policy PDFs while ensuring absolute factual accuracy. Outcome: Reduced manual HR query load by 40% by providing instant, 100% citation-backed resolutions." :
                               "Challenge/Outcome metrics are currently being compiled for this project."
                             }
                           </p>
                        </div>
                      </section>
                    </div>
                    
                    <div className="space-y-8">
                       <div className="p-8 rounded-[32px] bg-zinc-900 border border-white/10">
                          <h4 className="text-white/20 font-black uppercase text-[10px] mb-6 tracking-[0.4em]">Methodology</h4>
                          <ul className="space-y-4">
                            {(
                              selectedProject.id === "ethos-style" ? [
                                "Collaborative Filtering",
                                "Computer Vision (ResNet-50)",
                                "NLP (Sentence-BERT)",
                                "MORS Optimization",
                                "Explainable AI (XAI)"
                              ] : 
                              selectedProject.title.includes("Predictive") ? [
                                "Survival Analysis",
                                "Random Forest",
                                "Precision-Recall Optimization",
                                "Time-series Cross-validation"
                              ] :
                              selectedProject.title.includes("Cluster") ? [
                                "K-Means Clustering",
                                "PCA Dimensionality Reduction",
                                "Silhouette Scoring",
                                "Behavioral Segmentation"
                              ] :
                              selectedProject.title.includes("Sentiment") ? [
                                "Transformer Models (BERT)",
                                "Real-time Streaming",
                                "Named Entity Recognition",
                                "Sentiment Analysis"
                              ] :
                              selectedProject.title.includes("Edge") ? [
                                "Model Quantization",
                                "ONNX Runtime",
                                "Containerization",
                                "Edge Computing"
                              ] :
                              selectedProject.title.includes("Cyber") ? [
                                "Anomaly Detection",
                                "Isolation Forest",
                                "Log Aggregation",
                                "Unsupervised Learning"
                              ] :
                              selectedProject.id === "policy-nexus" ? [
                                "Agentic RAG",
                                "Chain-of-Verification",
                                "Hybrid Retrieval",
                                "Knowledge Graphing"
                              ] : 
                              selectedProject.id === "ecommerce-analytics" ? [
                                "Stream Processing",
                                "Fault Tolerance",
                                "Horizontal Scalability",
                                "Windowed Aggregations"
                              ] : 
                              selectedProject.id === "hr-policy-ai" ? [
                                "Factual Grounding",
                                "Semantic Search",
                                "Prompt Wrapper Design",
                                "Extractive QA"
                              ] :
                              selectedProject.methodology || ["Methodology details pending."]
                            ).map((it, i) => (
                              <li key={i} className="text-zinc-300 text-sm flex gap-3 items-center font-medium uppercase tracking-[0.2em]">
                                 <span className="text-white/30 text-[10px]">▪</span> 
                                 <span className="pt-px">{it}</span>
                              </li>
                            ))}
                          </ul>
                       </div>
                       <div className="p-8 rounded-[32px] border border-white/10 flex flex-col items-center justify-center opacity-20 italic bg-zinc-900">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white">Project ID</span>
                          <span className="text-3xl font-black text-white">{selectedProject.id.split('-')[0]}</span>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Footer />
          </motion.div>
        );

      case 'experience':
        return (
          <motion.div 
            key="experience" 
            custom={direction}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-6xl mx-auto pt-40 px-6 pb-20"
          >
            <motion.div variants={itemVariants} custom={direction} className="mb-12">
              <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-zinc-400 mb-2">Experience</p>
              <h2 className="text-5xl font-extrabold text-white tracking-[-0.04em] mb-6">Work Experience</h2>
              <p className="text-zinc-400 text-lg font-normal tracking-tight">
                Data Scientist specialized in high-velocity ETL pipelines, MLOps, and predictive modeling.
              </p>
            </motion.div>

            <div className="space-y-8 mb-16">
              <motion.div variants={scrollVariants} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-20px" }} className={glassCardClass}>
                <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
                  <div>
                    <h3 className="text-3xl font-extrabold tracking-[-0.04em] mb-1">Data Scientist | MODEC (Client)</h3>
                    <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.2em]">HESC (Employer)</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-lg font-extrabold text-zinc-900 tracking-[-0.04em]">India</p>
                    <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.1em]">Jan 2024 – Jul 2024</p>
                  </div>
                </div>
                <ul className="space-y-4 text-[15px] text-zinc-800 font-normal leading-relaxed tracking-tight w-full">
                  <li>• Optimized high-velocity ETL/ELT pipelines in Azure Databricks using PySpark, orchestrating the ingestion of multi-terabyte FPSO sensor data into a standardized Medallion architecture (Bronze, Silver, Gold layers) for real-time monitoring and advanced asset analytics.</li>
                  <li>• Developed sophisticated data modeling strategies within the Delta Lake environment, implementing schema enforcement and time-travel features to support predictive maintenance and reduce operational data redundancy by 30%.</li>
                  <li>• Built automated data quality frameworks using Python to validate multi-source schema consistency, identifying and resolving over 40% of reporting discrepancies before they reached critical stakeholder dashboards.</li>
                </ul>
              </motion.div>

              <motion.div variants={scrollVariants} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-20px" }} className={glassCardClass}>
                <div className="flex flex-col md:flex-row justify-between mb-6 gap-2">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-[-0.04em]">Data Scientist | Equinor (Client) — HESC</h3>
                    <p className="text-zinc-500 font-medium text-sm">India</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-zinc-900 font-extrabold tracking-tight">Aug 2023 – Dec 2023</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Snowflake', 'SQL Optimization', 'Anomaly Detection', 'PowerBI', 'Analytics'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
                <ul className="space-y-4 text-zinc-800 text-[15px] font-normal leading-relaxed tracking-tight w-full">
                  <li>• Consolidated disparate production and maintenance data streams into a centralized Snowflake data warehouse, establishing a single source of truth for operational analytics across the global enterprise.</li>
                  <li>• Implemented proactive anomaly-detection monitoring for data ingestion pipelines, leveraging custom SQL alerting that improved system response time to data failures by 20%.</li>
                  <li>• Optimized complex SQL queries and indexing strategies, leading to a 25% improvement in dashboard refresh rates and reducing monthly compute costs for heavy analytical workloads.</li>
                </ul>
              </motion.div>

              <motion.div variants={scrollVariants} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-20px" }} className={glassCardClass}>
                <div className="flex flex-col md:flex-row justify-between mb-8 gap-2">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-[-0.04em]">Junior Data Scientist — NTT DATA</h3>
                    <p className="text-zinc-500 font-medium text-sm">India</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-zinc-900 font-extrabold tracking-tight">Feb 2022 – June 2023</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Data Cleaning', 'Statistical Analysis', 'Python', 'Reporting'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
                <ul className="space-y-4 text-zinc-800 text-[15px] font-normal leading-relaxed tracking-tight w-full">
                  <li>• Performed comprehensive data cleaning and exploratory data analysis (EDA) on large datasets to identify critical business trends and patterns for executive intelligence reporting.</li>
                  <li>• Developed automated scripts to streamline complex data extraction processes from legacy systems, reducing manual monthly reporting time by 15%.</li>
                </ul>
              </motion.div>
            </div>

            <motion.div variants={scrollVariants} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-20px" }} className={glassCardClass}>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-6">Tools & Stack</p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'SQL', 'PySpark', 'Azure Databricks', 'Snowflake', 'Delta Lake', 'Kafka', 'Spark Streaming', 'Docker', 'Kubernetes', 'PowerBI', 'MLOps', 'ETL/ELT'].map(tool => (
                  <span key={tool} className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-800 text-[11px] font-bold uppercase tracking-wide shadow-sm">{tool}</span>
                ))}
              </div>
            </motion.div>

            <Footer />
          </motion.div>
        );

      case 'live-apps':
        return (
          <motion.div 
            key="live-apps" 
            custom={direction} 
            variants={pageVariants} 
            initial="initial" 
            animate="animate" 
            exit="exit" 
            className="max-w-6xl mx-auto pt-40 px-6 pb-20"
          >
            <h2 className="text-4xl font-extrabold mb-12 text-white text-center tracking-[-0.04em] italic">Interactive Demos</h2>
            <div className="grid grid-cols-1 gap-16">
              {liveApps.map(app => (
                <div key={app.id} className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-[40px] overflow-hidden shadow-2xl">
                  <div className="p-8 border-b border-zinc-200">
                    <h3 className="text-2xl font-extrabold mb-2 text-zinc-900 tracking-[-0.04em]">{app.title}</h3>
                    <p className="text-zinc-600 font-normal tracking-tight">{app.description}</p>
                  </div>
                  <div className="h-[600px] bg-zinc-50/50">
                    <iframe src={app.url} className="w-full h-full border-none" title={app.title} />
                  </div>
                </div>
              ))}
            </div>
            <Footer />
          </motion.div>
        );

      default:
        return (
          <motion.div 
            key={activeTab} 
            custom={direction} 
            variants={pageVariants} 
            initial="initial" 
            animate="animate" 
            exit="exit" 
            className="pt-48 text-center text-zinc-400 font-medium text-2xl"
          >
            <p className="uppercase tracking-[0.4em]">{activeTab} section</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-x-hidden">
      <motion.div 
        initial={{ scale: 1.1, x: -10, y: -10 }}
        animate={{ scale: 1.2, x: 10, y: 10 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="fixed inset-0 z-0 pointer-events-none opacity-80 grayscale-[30%] brightness-[0.7] contrast-110"
        style={{ backgroundImage: "url('/nyc-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-zinc-950/10 via-transparent to-zinc-950/80"></div>
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div 
          key={activeTab}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;