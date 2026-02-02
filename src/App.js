import React, { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabaseClient";
import logoImage from "./assets/logo.jpeg";
import cahcetLogoImage from "./assets/cahcet.jpg";
import qrCodeImage from "./assets/qr code.jpeg";
import sbvLogoImage from "./assets/sbv.png";
import bashaLogoImage from "./assets/basha snacks pani puri.jpeg";
import paintLogoImage from "./assets/paints.jpeg";
import iconstructionsLogoImage from "./assets/i construction .jpg.jpeg";
import pptLogoImage from "./assets/ppt.jpeg";
import artsLogoImage from "./assets/arts.jpeg";
import cdLogoImage from "./assets/cd.jpeg";
import connLogoImage from "./assets/conn.jpeg";
import cwfLogoImage from "./assets/cwf.jpeg";
import dicLogoImage from "./assets/dic.jpeg";
import ffLogoImage from "./assets/ff.jpeg";
import iplLogoImage from "./assets/ipl.jpeg";
import phoLogoImage from "./assets/pho.jpeg";
import tdLogoImage from "./assets/td.jpeg";
import thLogoImage from "./assets/th.jpeg";
import tqLogoImage from "./assets/tq.jpeg";
import uxLogoImage from "./assets/ux.jpeg";
import vcLogoImage from "./assets/vc.jpeg";
import zgcLogoImage from "./assets/zgc.jpeg";
import anbuLogoImage from "./assets/anbu.jpeg";
import sbiLogoImage from "./assets/sbi.jpeg";
import deepikhaLogoImage from "./assets/deepikha.jpeg";
import nbcLogoImage from "./assets/nbc.jpeg";
import naurasLogoImage from "./assets/nauras.png";
import dcadd1LogoImage from "./assets/dcadd1.jpeg";
import dcadd2LogoImage from "./assets/dcadd2.jpeg";
import nsbLogoImage from "./assets/nsb.jpeg";
function App() {
  const eventDate = new Date("2026-02-07T09:00:00").getTime();
  const [time, setTime] = useState({});
  const [view, setView] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [registered, setRegistered] = useState(false);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [registrationType, setRegistrationType] = useState("individual");
  const [teamMembers, setTeamMembers] = useState([{ id: 1, name: "", email: "", phone: "", college: "" }]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [eventFilter, setEventFilter] = useState("all");
  const [selectedEventRule, setSelectedEventRule] = useState(null);
  const [selectedImageModal, setSelectedImageModal] = useState(null);
  const [news, setNews] = useState([
    { id: 1, title: "📢 Important Announcement", message: "Early bird registration ends Feb 6, 2026", type: "important", time: "2 hours ago" },
    { id: 2, title: "🚀 New Event Added", message: "Events Are Added Successfully", type: "update", time: "4 hours ago" },
    { id: 3, title: "✅ Registration Open", message: "Online Registration is Open, Register Your Slot", type: "Register", time: "1 day ago" },
    { id: 4, title: "📍 Venue Confirmed", message: "Event venue confirmed at CAHCET Campus - All facilities ready", type: "info", time: "2 days ago" },
    { id: 5, title: "🎯 Limited Spots", message: " 4 New Events is added to CAHCET Symposium", type: "update", time: "3 days ago" },
  ]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    year: "",
    event: "",
    teamSize: "1",
    teamName: "",
    paymentScreenshot: "",
    registrationDate: new Date().toISOString()
  });

  const [showNewsAlert, setShowNewsAlert] = useState(true);

  // Only keep dynamic data states for events
  const [events, setEvents] = useState([]);

  // Remove dynamic states for static sections
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Admin states
  const [registrations, setRegistrations] = useState([]);
  const [adminView, setAdminView] = useState("dashboard");
  const [adminToken, setAdminToken] = useState("");
  const [selectedTeamRegistration, setSelectedTeamRegistration] = useState(null);

  // Edit states for CRUD operations - only keep events
  const [editingEvent, setEditingEvent] = useState(null);

  // State for description modal
  const [selectedEventDescription, setSelectedEventDescription] = useState(null);

  // Form states for adding new items - only keep events
  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "",
    venue: "",
    description: "",
    capacity: "",
    price: "",
    soloPrice: "",
    teamPrice: "",
    type: "tech",
    maxTeamParticipants: "",
    maxTeamMembersRestricted: ""
  });

  // Static data for rules
  const staticRules = [
    { id: 1, title: "General Rule", description: "All Participation from Various College must wear their ID card.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" },
    { id: 2, title: "Code of Conduct", description: "All participants must maintain professional decorum and respect fellow participants, judges, and organizers.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" },
    { id: 3, title: "Online Registration Deadline", description: "All Online Registration submissions must be completed by Feb 6. Late submissions will not be accepted.", image: "https://images.unsplash.com/photo-1611632736597-de2d4265fba3?w=400&h=300&fit=crop" },
    { id: 4, title: "Offline Registration", description: "Offline Registration is also Avaible in the Venue Auditorium and its open till 10:30.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" },
    { id: 5, title: "Be on Time", description: "After the Completion of the Inaguration Cermony please be move to the respected Events Venue inside the campus.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" },
    { id: 6, title: "Resources", description: "For Events Lab are alloted but for some events you need to take your personal laptop.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop" },
  ];

  // Static data for event-specific rules
  const staticEventRules = [
    {
      eventName: "Paper Presentation",
      eventType: "tech",
      icon: "📄",
      image: pptLogoImage,
      rules: [
        { id: 1, rule: "Time Limit" },
        { id: 2, rule: "File Format" },
        { id: 3, rule: "Team Size" },
        { id: 4, rule: "Content" },
      ]
    },
    {
      eventName: "Virtual Design (UI/UX)",
      eventType: "tech",
      icon: "🎨",
      image: uxLogoImage,
      rules: [
        { id: 1, rule: "Tool Usage" },
        { id: 2, rule: "Design Time" },
        { id: 3, rule: "Team Size" },
        { id: 4, rule: "Design Criteria" },
      ]
    },
    {
      eventName: "NEURAL KNOCKOUT (Technical Quiz)",
      eventType: "tech",
      icon: "🧠",
      image: tqLogoImage,
      rules: [
        { id: 1, rule: "Solo Event" },
        { id: 2, rule: "Duration" },
        { id: 3, rule: "Negative Marking" },
        { id: 4, rule: "Device" },
      ]
    },
    {
      eventName: "Cortex Dock (Coding & Debugging)",
      eventType: "tech",
      icon: "💻",
      image: cdLogoImage,
      rules: [
        { id: 1, rule: "Time Limit" },
        { id: 2, rule: "Languages" },
        { id: 3, rule: "Team Size" },
        { id: 4, rule: "No Resources" },
      ]
    },
    {
      eventName: "No Flame Fest (Cooking Without Fire)",
      eventType: "non-tech",
      icon: "🍲",
      image: cwfLogoImage,
      rules: [
        { id: 1, rule: "Time Limit" },
        { id: 2, rule: "No Cooking" },
        { id: 3, rule: "Team Size" },
        { id: 4, rule: "Ingredients" },
      ]
    },
    {
      eventName: "E-Sports",
      eventType: "non-tech",
      icon: "🎮",
      image: ffLogoImage,
      rules: [
        { id: 1, rule: "Game" },
        { id: 2, rule: "Team Size" },
        { id: 3, rule: "Fair Play" },
        { id: 4, rule: "Registration" },
      ]
    },
    {
      eventName: "Photography & ShortFilms",
      eventType: "non-tech",
      icon: "📹",
      image: phoLogoImage,
      rules: [
        { id: 1, rule: "Format" },
        { id: 2, rule: "Duration" },
        { id: 3, rule: "Team Size" },
        { id: 4, rule: "Theme" },
      ]
    },
    {
      eventName: "PROMPT2PAGE",
      eventType: "tech",
      icon: "✍️",
      image: vcLogoImage,
      rules: [
        { id: 1, rule: "Time Limit" },
        { id: 2, rule: "Technologies" },
        { id: 3, rule: "Team Size" },
        { id: 4, rule: "Responsiveness" },
      ]
    },
    {
      eventName: "Argue It Out (Technical Debate)",
      eventType: "tech",
      icon: "🗣️",
      image: tdLogoImage,
      rules: [
        { id: 1, rule: "Team Size" },
        { id: 2, rule: "Duration" },
        { id: 3, rule: "Topic" },
        { id: 4, rule: "Language" },
      ]
    },
    {
      eventName: "Bid & Build (IPL Auction)",
      eventType: "non-tech",
      icon: "💰",
      image: iplLogoImage,
      rules: [
        { id: 1, rule: "Team Size" },
        { id: 2, rule: "Budget" },
        { id: 3, rule: "Strategy" },
        { id: 4, rule: "Duration" },
      ]
    },
    {
      eventName: "Data Insight Challenge (Data Hackathon)",
      eventType: "tech",
      icon: "📊",
      image: dicLogoImage,
      rules: [
        { id: 1, rule: "Time Limit" },
        { id: 2, rule: "Tools" },
        { id: 3, rule: "Team Size" },
        { id: 4, rule: "Dataset" },
      ]
    },
    {
      eventName: "No Net Knockout (Zero Google Challenge)",
      eventType: "tech",
      icon: "🚫",
      image: zgcLogoImage,
      rules: [
        { id: 1, rule: "No Internet" },
        { id: 2, rule: "Time Limit" },
        { id: 3, rule: "Team Size" },
        { id: 4, rule: "Fair Play" },
      ]
    },
    {
      eventName: "THINK & SYNC (Connections)",
      eventType: "non-tech",
      icon: "🧩",
      image: connLogoImage,
      rules: [
        { id: 1, rule: "Team Size" },
        { id: 2, rule: "Puzzle Type" },
        { id: 3, rule: "Duration" },
        { id: 4, rule: "No Devices" },
      ]
    },
    {
      eventName: "Artistry Aura (Visual Arts & Mehndi)",
      eventType: "non-tech",
      icon: "🎭",
      image: artsLogoImage,
      rules: [
        { id: 1, rule: "Time Limit" },
        { id: 2, rule: "Materials" },
        { id: 3, rule: "Team Size" },
        { id: 4, rule: "Theme" },
      ]
    },
    {
      eventName: "Trace & Triumphs (Treasure Hunt)",
      eventType: "non-tech",
      icon: "🏆",
      image: thLogoImage,
      rules: [
        { id: 1, rule: "Team Size" },
        { id: 2, rule: "Duration" },
        { id: 3, rule: "Fair Play" },
        { id: 4, rule: "Safety" },
      ]
    },
  ];

  // Static data for schedule
  const staticSchedule = [
    { id: 1, time: "9:30 AM", event: "Inaguration Ceremony", venue: "CAHCET Auditorium" },
    { id: 2, time: "10:30 AM", event: "Events Begins", venue: "Respective Venues" },
    { id: 3, time: "10:30 AM", event: "Paper Presentation", venue: "Tech Tower Seminar Hall" },
    { id: 4, time: "10:30 AM", event: "Virtual Design (UI/UX)", venue: "Lab 9 Tech Tower" },
    { id: 5, time: "10:30 AM", event: "NEURAL KNOCKOUT (Technical Quiz)", venue: "AI&DS Smart Room" },
    { id: 6, time: "10:30 AM", event: " Cortex Dock (Coding & Debugging)", venue: "Lab 3 Main Block" },
    { id: 7, time: "10:30 AM", event: "No Flame Fest(Cooking Without Fire)", venue: "Physics Lab" },
    { id: 8, time: "11:00 AM", event: "E-Sports", venue: "Auditorium" },
    { id: 9, time: "11:00 AM", event: "Photography & ShortFilms", venue: "Mech Seminar Hall" },
    { id: 10, time: "11:00 AM", event: "PROMPT2PAGE", venue: "Lab 8 Tech Tower" },
    { id: 11, time: "12:00 PM", event: "Argue It Out (Technical Debate)", venue: "Mech Seminar Hall" },
    { id: 12, time: "1:00 PM", event: "Bid & Build (IPL Auction)", venue: "AI&DS Smart Room" },
    { id: 13, time: "1:00 PM", event: "Data Insight Challenge (Data Hackathon)", venue: "Lab 8 Tech Tower" },
    { id: 15, time: "1:00 PM", event: "No Net Knockout (Zero Google Challenge)", venue: "Tech Tower Seminar Hall" },
    { id: 16, time: "1:00 PM", event: "THINK & SYNC (Connections)", venue: "EEE Seminar Hall" },
    { id: 14, time: "1:00 PM", event: "Artistry Aura (Visual Arts & Mehndi) 🎨", venue: "Drawing Hall Main Block" },
    { id: 17, time: "2:00 PM", event: "Trace & Triumphs (Treasure Hunt)", venue: "Auditorium" },
    { id: 18, time: "3:15 PM", event: "Closing Ceremony", venue: "Auditorium" },
  ];

  // Static data for sponsors
  const staticSponsors = [
    { id: 1, name: "I Constructions.", logo: iconstructionsLogoImage, level: "Elite", website: "www.facebook.com/iconstruction100" },
    { id: 2, name: "SBV Technology", logo: sbvLogoImage, level: "Elite", website: "https://www.sbvtechnologies.com/" },
    { id: 3, name: "Old Duco Paints & Hardwares", logo: paintLogoImage, level: "Elite", website: "" },
    { id: 4, name: "Diagonal CADD", logo: dcadd1LogoImage, level: "Elite", website: "https://gcadd.in/" },
    { id: 5, name: "G-Academy", logo: dcadd2LogoImage, level: "Elite", website: "https://gcadd.in/" },

    { id: 6, name: "Nadeem Beef Center", logo: nbcLogoImage, level: "Premium", website: "" },    
    { id: 7, name: "All Star Real Estate & Builders", logo: "🏢", level: "Premium", website: "https://allstarproperty.in/" },
    { id: 8, name: "Nawras Enterprises", logo: naurasLogoImage, level: "Premium", website: "" },
    { id: 9, name: "Basha Snacks Pani Puri", logo: bashaLogoImage, level: "Premium", website: "" },
    { id: 10, name: "SBI", logo: sbiLogoImage, level: "Premium", website: "" },
    { id: 11, name: "Anbu Home Appliances", logo: anbuLogoImage, level: "Standard", website: "" },
    { id: 12, name: "Deepika's Beauty Parlour", logo: deepikhaLogoImage, level: "Standard", website: "https://www.devtoolsco.com/" },
    { id: 13, name: "NSB", logo: nsbLogoImage, level: "Standard", website: "" },

  ];

  // Static data for coordinators
  const staticCoordinators = [
    { id: 1, name: "Mr. T S Karthick", role: "HOD/AI&DS", email: "aironix26@gmail.com", phone: "9894746047" },
    { id: 2, name: "MRs. Saranya R", role: "Symposium Coordinator", email: "aironix26@gmail.com", phone: "8220387634" },
  ];

  // Static data for gallery
  const staticGallery = [
    { id: 1, url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800", category: "events" },
    { id: 2, url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800", category: "workshops" },
    { id: 3, url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800", category: "tech" },
    { id: 4, url: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800", category: "events" },
    { id: 5, url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800", category: "non-tech" },
    { id: 6, url: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800", category: "workshops" },
  ];

  // Fetch all data on component mount
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = eventDate - now;

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    // Load only events data
    fetchEventsData();

    // Check if admin token exists in localStorage
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setAdminToken(savedToken);
      setAdminLoggedIn(true);
    }

    // Always show news alert on page load (no persistence)

    return () => clearInterval(interval);
  }, []);

  const closeNewsAlert = () => {
    setShowNewsAlert(false);
  };

  // Fetch data when admin logs in
  useEffect(() => {
    if (adminLoggedIn && adminToken) {
      fetchEventsData();
    }
  }, [adminLoggedIn, adminToken]);

  const fetchEventsData = async () => {
    try {
      // Fetch events
      const { data: eventsData, error } = await supabase
        .from('events')
        .select(`
          *,
          soloPrice:solo_price,
          teamPrice:team_price,
          maxTeamParticipants:max_team_members,
          maxTeamMembersRestricted:max_team_members_restricted
        `)
        .order('id', { ascending: true });

      if (error) throw error;
      setEvents(eventsData || []);

      // Calculate total registrations from events count
      const totalRegistered = (eventsData || []).reduce((sum, event) => sum + (event.registered || 0), 0);
      setRegisteredCount(totalRegistered);

      // Fetch registrations if admin
      if (adminLoggedIn && adminToken) {
        const { data: registrationsData, error: regError } = await supabase
          .from('registrations')
          .select('*')
          .order('created_at', { ascending: false });

        if (regError) {
          console.log('Failed to fetch registrations:', regError);
        } else {
          setRegistrations(registrationsData || []);
        }
      }
    } catch (error) {
      console.log('Error loading data:', error);
      // loadDefaultEventsData(); 
    }
  };

  const loadDefaultEventsData = () => {
    setEvents([
      { id: 1, title: "AI Model Showcase", time: "10:00 AM", venue: "Main Hall", description: "Showcase innovative AI models", capacity: 200, registered: 150, price: 100, soloPrice: 100, teamPrice: 180, type: "tech" },
      { id: 2, title: "Data Science Workshop", time: "2:00 PM", venue: "Lab 3", description: "Hands-on data science techniques", capacity: 100, registered: 80, price: 150, soloPrice: 150, teamPrice: 270, type: "tech" },
      { id: 3, title: "ML Hackathon", time: "4:30 PM", venue: "Innovation Center", description: "Build ML solutions in 3 hours", capacity: 150, registered: 120, price: 200, soloPrice: 200, teamPrice: 360, type: "tech" },
      { id: 4, title: "Keynote: Future of AI", time: "6:00 PM", venue: "Auditorium", description: "Industry leaders discuss AI trends", capacity: 500, registered: 400, price: 50, soloPrice: 50, teamPrice: 90, type: "non-tech" },
      { id: 5, title: "AI Art Exhibition", time: "11:00 AM", venue: "Gallery Hall", description: "AI-generated art showcase", capacity: 100, registered: 60, price: 75, soloPrice: 75, teamPrice: 135, type: "non-tech" },
      { id: 6, title: "Robotics Demo", time: "3:00 PM", venue: "Robotics Lab", description: "Live robotics demonstrations", capacity: 80, registered: 45, price: 125, soloPrice: 125, teamPrice: 225, type: "tech" },
    ]);

    setRegisteredCount(247);
  };

  const triggerConfetti = () => {
    const pieces = Array.from({ length: 64 }).map(() => ({
      id: Math.random().toString(36).slice(2),
      left: Math.random() * 80 + 10,
      bg: ["#D4AF37", "#F9E7B0", "#FFD580", "#4DA3FF", "#7CC0FF", "#9D4EDD"][Math.floor(Math.random() * 6)],
      delay: Math.random() * 0.6,
      size: Math.random() * 10 + 5,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 2600);
  };

  // Helper function to truncate description
  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength).trim() + "...";
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (e.target.name === 'event') {
      const selectedEvent = events.find(event => event.title === e.target.value);
      if (selectedEvent) {
        // Set pricing based on participation type
        if (registrationType === 'solo') {
          setPaymentAmount(selectedEvent.soloPrice || selectedEvent.price);
        } else {
          setPaymentAmount(selectedEvent.teamPrice || selectedEvent.price);
        }
      }
    }

    if (e.target.name === 'teamSize') {
      const size = parseInt(e.target.value);
      if (size > teamMembers.length) {
        const newMembers = [...teamMembers];
        for (let i = teamMembers.length; i < size; i++) {
          newMembers.push({ id: i + 1, name: "", email: "", phone: "", college: "" });
        }
        setTeamMembers(newMembers);
      } else if (size < teamMembers.length) {
        setTeamMembers(teamMembers.slice(0, size));
      }
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newMembers = [...teamMembers];
    newMembers[index][field] = value;
    setTeamMembers(newMembers);
  };

  const addTeamMember = () => {
    if (teamMembers.length < 4) {
      setTeamMembers([...teamMembers, { id: teamMembers.length + 1, name: "", email: "", phone: "", college: "" }]);
      setFormData(prev => ({ ...prev, teamSize: (teamMembers.length + 1).toString() }));
    }
  };

  const removeTeamMember = (index) => {
    if (teamMembers.length > 1) {
      const newMembers = teamMembers.filter((_, i) => i !== index);
      setTeamMembers(newMembers);
      setFormData(prev => ({ ...prev, teamSize: newMembers.length.toString() }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFile(file);
        setUploadSuccess(true);
        setFormData(prev => ({ ...prev, paymentScreenshot: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateTotal = () => {
    const selectedEvent = events.find(event => event.title === formData.event);
    if (!selectedEvent) return 0;

    if (registrationType === 'solo') {
      // Solo participation - use solo price
      return selectedEvent.soloPrice || selectedEvent.price;
    } else {
      // Team participation - use team price
      const teamSize = parseInt(formData.teamSize);
      return selectedEvent.teamPrice || (selectedEvent.price * teamSize * 0.9);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Find event
      const selectedEvent = events.find(event => event.title === formData.event);
      if (!selectedEvent) throw new Error('Event not found or failed to load. Please try again.');

      // Validate team member restriction before submitting
      if (registrationType === 'team') {
        if (selectedEvent.maxTeamMembersRestricted) {
          const teamSize = parseInt(formData.teamSize);
          if (teamSize > selectedEvent.maxTeamMembersRestricted) {
            alert(`This event restricts team participation to maximum ${selectedEvent.maxTeamMembersRestricted} members per team. You cannot register with ${teamSize} members.`);
            setLoading(false);
            return;
          }
        }
      }

      // Upload Screenshot
      let screenshotUrl = null;
      if (uploadedFile) {
        const fileExt = uploadedFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const { data: fileData, error: uploadError } = await supabase.storage
          .from('payment_screenshots')
          .upload(fileName, uploadedFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('payment_screenshots')
          .getPublicUrl(fileName);

        screenshotUrl = urlData.publicUrl;
      }

      // Insert Registration
      const registrationPayload = {
        event_id: selectedEvent.id,
        event_title: selectedEvent.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        department: formData.department,
        year: formData.year,
        registration_type: registrationType,
        team_size: registrationType === 'team' ? formData.teamSize : '1',
        team_name: formData.teamName,
        team_members: registrationType === 'team' ? teamMembers : null,
        total_amount: calculateTotal(),
        payment_screenshot_url: screenshotUrl,
        status: 'pending'
      };

      const { error: insertError } = await supabase
        .from('registrations')
        .insert([registrationPayload]);

      if (insertError) throw insertError;

      // Success
      triggerConfetti();
      setRegistered(true);
      setRegisteredCount(prev => prev + 1);
      setVerificationStatus('pending');

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        college: "",
        department: "",
        year: "",
        event: "",
        teamSize: "1",
        teamName: "",
        paymentScreenshot: "",
        registrationDate: new Date().toISOString()
      });
      setTeamMembers([{ id: 1, name: "", email: "", phone: "", college: "" }]);
      setUploadedFile(null);
      setUploadSuccess(false);

      setTimeout(() => setRegistered(false), 5000);

      // Update events to show new count (if trigger updated it)
      fetchEventsData();

    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactForm)
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message || 'Message sent successfully! We will get back to you soon.');
      } else {
        alert(data.message || 'Message sent! We will get back to you soon.');
      }

      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Message sent successfully! We will get back to you soon.');
      setContactForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      });

      if (error) throw error;

      if (data.session) {
        setAdminToken(data.session.access_token);
        setAdminLoggedIn(true);
        setShowAdminLogin(false);
        setAdminView("dashboard");
        localStorage.setItem('adminToken', data.session.access_token);
        alert("Admin login successful!");
        fetchEventsData();
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Admin functions for Events CRUD
  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.time || !newEvent.venue || !newEvent.description || !newEvent.capacity || !newEvent.price) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const { data, error } = await supabase.from('events').insert([{
        title: newEvent.title,
        description: newEvent.description,
        time: newEvent.time,
        venue: newEvent.venue,
        type: newEvent.type || 'tech',
        capacity: parseInt(newEvent.capacity),
        solo_price: parseInt(newEvent.soloPrice || newEvent.price),
        team_price: parseInt(newEvent.teamPrice || newEvent.price),
        registered: 0,
        max_team_members: newEvent.maxTeamParticipants ? parseInt(newEvent.maxTeamParticipants) : null,
        max_team_members_restricted: newEvent.maxTeamMembersRestricted ? parseInt(newEvent.maxTeamMembersRestricted) : null,
        is_active: true
      }]);

      if (error) throw error;

      fetchEventsData();
      setNewEvent({
        title: "",
        time: "",
        venue: "",
        description: "",
        capacity: "",
        price: "",
        soloPrice: "",
        teamPrice: "",
        type: "tech",
        maxTeamParticipants: ""
      });
      alert("Event added successfully!");
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event: ' + error.message);
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent) return;

    try {
      const updatePayload = {
        title: editingEvent.title,
        description: editingEvent.description,
        time: editingEvent.time,
        venue: editingEvent.venue,
        type: editingEvent.type,
        capacity: parseInt(editingEvent.capacity),
        solo_price: parseInt(editingEvent.soloPrice || editingEvent.solo_price || editingEvent.price),
        team_price: parseInt(editingEvent.teamPrice || editingEvent.team_price || editingEvent.price),
        max_team_members: editingEvent.maxTeamParticipants ? parseInt(editingEvent.maxTeamParticipants) : null,
        max_team_members_restricted: editingEvent.maxTeamMembersRestricted ? parseInt(editingEvent.maxTeamMembersRestricted) : null
      };

      const { error } = await supabase
        .from('events')
        .update(updatePayload)
        .eq('id', editingEvent.id);

      if (error) throw error;

      fetchEventsData();
      setEditingEvent(null);
      alert("Event updated successfully!");
    } catch (error) {
      console.error('Error updating event:', error);
      alert("Error updating event: " + error.message);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const { error } = await supabase.from('events').delete().eq('id', id);

        if (error) throw error;

        setEvents(events.filter(event => event.id !== id));
        alert("Event deleted successfully!");
      } catch (error) {
        console.error('Error deleting event:', error);
        alert("Error deleting event: " + error.message);
      }
    }
  };

  // Registration functions
  const updateRegistrationStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('registrations')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setRegistrations(prev => prev.map(reg =>
        reg.id === id ? { ...reg, status } : reg
      ));

      if (status === 'approved') {
        setRegisteredCount(prev => prev + 1);
      }

      alert(`Registration ${status} successfully!`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update registration status: ' + error.message);
    }
  };

  const exportToExcel = () => {
    alert('Export feature will be available in production with backend integration.');
  };

  const exportToPDF = () => {
    alert('Export feature will be available in production with backend integration.');
  };

  return (
    <div className="App">
      {/* Interactive Background Elements */}
      <div className="ai-background">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="neural-net"></div>
        <div className="ai-robot ai-robot-1">🤖</div>
        <div className="ai-robot ai-robot-2">🤖</div>
        <div className="ai-robot ai-robot-3">🤖</div>
        <div className="circuit-lines"></div>
      </div>

      {/* Confetti */}
      {confetti.length > 0 && (
        <div className="confetti-container">
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="confetti-piece"
              style={{
                left: `${piece.left}%`,
                backgroundColor: piece.bg,
                animationDelay: `${piece.delay}s`,
                width: `${piece.size}px`,
                height: `${piece.size * 1.5}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="ai-spinner"></div>
            <p>Processing...</p>
          </div>
        </div>
      )}

      {/* Registration Success Toast */}
      {registered && (
        <div className="toast">
          <span className="toast-icon">✨</span>
          <div>
            <strong>Registration Successful!</strong>
            <p>Payment verification pending. Confirmation will be sent via email.</p>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="admin-login-modal">
          <div className="admin-login-content">
            <h2>🔐 Admin Login</h2>
            <p>Enter credentials to access admin panel</p>
            <form onSubmit={handleAdminLogin}>
              <input
                type="email"
                placeholder="Admin Email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Admin Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
              <div className="admin-login-buttons">
                <button type="submit" className="admin-login-btn">
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <button type="button" onClick={() => setShowAdminLogin(false)} className="admin-cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Description Modal */}
      {selectedEventDescription && (
        <div className="modal-overlay" onClick={() => setSelectedEventDescription(null)}>
          <div className="description-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedEventDescription.title}</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedEventDescription(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="description-content">
                <p>{selectedEventDescription.description}</p>
              </div>
              <div className="description-event-info">
                <div className="info-item">
                  <span className="info-label">⏰ Time:</span>
                  <span className="info-value">{selectedEventDescription.time}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📍 Venue:</span>
                  <span className="info-value">{selectedEventDescription.venue}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">💰 Pricing:</span>
                  <span className="info-value">Solo: ₹{selectedEventDescription.soloPrice || selectedEventDescription.price} | Team: ₹{selectedEventDescription.teamPrice || selectedEventDescription.price}</span>
                </div>
                {adminLoggedIn && (
                  <div className="info-item">
                    <span className="info-label">👥 Capacity:</span>
                    <span className="info-value">{selectedEventDescription.registered}/{selectedEventDescription.capacity}</span>
                  </div>
                )}
                {selectedEventDescription.maxTeamParticipants && (
                  <div className="info-item">
                    <span className="info-label">👥 Max Team Size:</span>
                    <span className="info-value">{selectedEventDescription.maxTeamParticipants}</span>
                  </div>
                )}
              </div>
              <button 
                className="close-modal-btn"
                onClick={() => setSelectedEventDescription(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo-container" onClick={() => { setView('home'); setSidebarOpen(false); }}>
            <img src={logoImage} alt="AIRONIX Logo" className="navbar-logo" />
            <h1 className="logo">
              <span className="logo-ai">AIRONIX</span>
              <span className="logo-year">'26</span>
            </h1>
          </div>

          <div className="nav-right">
            <button
              className={`hamburger ${sidebarOpen ? 'open' : ''}`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <ul className="nav-menu">
              <li className="nav-link" onClick={() => setView('home')}>HOME</li>
              <li className="nav-link" onClick={() => setView('about')}>ABOUT</li>
              <li className="nav-link" onClick={() => setView('events')}>EVENTS</li>
              <li className="nav-link" onClick={() => setView('schedule')}>SCHEDULE</li>
              <li className="nav-link" onClick={() => setView('register')}>REGISTER</li>
              <li className="nav-link" onClick={() => setView('rules')}>RULES</li>
              <li className="nav-link" onClick={() => setView('team')}>TEAM</li>
              <li className="nav-link" onClick={() => setView('sponsors')}>SPONSORS</li>
              <li className="nav-link" onClick={() => setView('gallery')}>GALLERY</li>
              <li className="nav-link" onClick={() => setView('contact')}>CONTACT</li>
              <li className="nav-link admin-nav" onClick={() => {
                if (adminLoggedIn) {
                  setView('admin');
                } else {
                  setShowAdminLogin(true);
                }
              }}>
                {adminLoggedIn ? "ADMIN PANEL" : "ADMIN"}
              </li>
            </ul>

            {adminLoggedIn && (
              <div className="registration-count">
                <div className="count-badge">
                  <span className="count-number">{registeredCount}</span>
                  <div className="count-glow"></div>
                </div>
                <span className="count-label">Registered</span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`sidebar-backdrop ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-ai-icon">
              <div className="ai-core"></div>
              <div className="ai-ring ai-ring-1"></div>
              <div className="ai-ring ai-ring-2"></div>
            </div>
            <span>AIRONIX '26</span>
          </div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>×</button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => { setView('home'); setSidebarOpen(false); }}>
              <span className="sidebar-icon">🏠</span>
              <span>Home</span>
            </li>
            <li onClick={() => { setView('about'); setSidebarOpen(false); }}>
              <span className="sidebar-icon">ℹ️</span>
              <span>About</span>
            </li>
            <li onClick={() => { setView('events'); setSidebarOpen(false); }}>
              <span className="sidebar-icon">🎪</span>
              <span>Events</span>
            </li>
            <li onClick={() => { setView('schedule'); setSidebarOpen(false); }}>
              <span className="sidebar-icon">📅</span>
              <span>Schedule</span>
            </li>
            <li onClick={() => { setView('register'); setSidebarOpen(false); }}>
              <span className="sidebar-icon">📝</span>
              <span>Register</span>
            </li>
            <li onClick={() => { setView('rules'); setSidebarOpen(false); }}>
              <span className="sidebar-icon">📋</span>
              <span>Rules</span>
            </li>
            <li onClick={() => { setView('team'); setSidebarOpen(false); }}>
              <span className="sidebar-icon">👥</span>
              <span>Team</span>
            </li>
            <li onClick={() => { setView('sponsors'); setSidebarOpen(false); }}>
              <span className="sidebar-icon">🤝</span>
              <span>Sponsors</span>
            </li>
            <li onClick={() => { setView('gallery'); setSidebarOpen(false); }}>
              <span className="sidebar-icon">📷</span>
              <span>Gallery</span>
            </li>
            <li onClick={() => { setView('contact'); setSidebarOpen(false); }}>
              <span className="sidebar-icon">📞</span>
              <span>Contact</span>
            </li>
            <li onClick={() => {
              if (adminLoggedIn) {
                setView('admin');
                setSidebarOpen(false);
              } else {
                setShowAdminLogin(true);
                setSidebarOpen(false);
              }
            }} className="admin-link">
              <span className="sidebar-icon">🔐</span>
              <span>Admin Panel</span>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          {adminLoggedIn && (
            <div className="sidebar-registration-count">
              <div className="sidebar-count-badge">
                <span className="sidebar-count-number">{registeredCount}</span>
              </div>
              <span className="sidebar-count-text">Registered</span>
            </div>
          )}
          <p>Join the AI Revolution</p>
          <div className="social-icons">
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="LinkedIn">💼</a>
            <a href="#" aria-label="GitHub">💻</a>
            <a href="#" aria-label="Instagram">📸</a>
          </div>
        </div>
      </div>

      {/* College Header Section */}
      <section className="college-header">
        <div className="college-header-content">
          <div className="college-logo-wrapper">
            <img src={cahcetLogoImage} alt="College Logo" className="college-logo" />
            <div className="logo-glow"></div>
          </div>
          <div className="college-info">
            <h2 className="college-name">C. Abdul Hakeem College Of Engineering & Technology</h2>
            <p className="college-location">Melvisharam - 632-509</p>
            <p className="college-tagline">Enter To Learn• Leave To Serve.</p>
          </div>
        </div>
      </section>

      {/* Home Page */}
      {view === "home" && (
        <section className="hero">
          <div className="hero-content">
            {showNewsAlert && (
              <div className="news-alert-overlay" onClick={closeNewsAlert}>
                <div className="news-alert-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                  <div className="news-alert-header">
                    <div className="news-alert-icon">🎉</div>
                    <h3 className="news-alert-title">Special Announcement</h3>
                    <button className="news-alert-x" onClick={closeNewsAlert} aria-label="Close">×</button>
                  </div>
                  <div className="news-alert-body">
                    <p>A special memento will be awarded to the college, other than CAHCET, with the maximum participation in AIRONIX.</p>
                  </div>
                  <div className="news-alert-actions">
                    <button className="news-alert-close" onClick={closeNewsAlert}>Got it</button>
                  </div>
                </div>
              </div>
            )}
            <div className="hero-title-container">
              <div className="hero-title-wrapper">
                <h1 className="hero-title">
                  <span className="hero-gradient">ARTIFICIAL</span>
                  <span className="hero-main">INTELLIGENCE</span>
                  <span className="hero-line">
                    <span className="hero-secondary">&</span>
                    <span className="hero-data-science">DATA SCIENCE</span>
                  </span>
                  <span className="hero-sub">SYMPOSIUM 2026</span>
                </h1>
                <div className="hero-badge">
                  <span className="badge-text">FEB 7, Sat, 2026 | CAHCET</span>
                  <div className="badge-glow"></div>
                </div>
              </div>
            </div>

            <div className="hero-subtitle">
              Where <span className="highlight">Innovation</span> Meets <span className="highlight">Intelligence</span>
            </div>

            {/* Floating News Section */}
            <div className="floating-news-container">
              <div className="news-ticker-header">
                <span className="ticker-badge">📰 LIVE</span>
                <h3>Latest Updates</h3>
              </div>
              
              <div className="news-ticker">
                <div className="ticker-content">
                  {news.map((item) => (
                    <div key={item.id} className={`ticker-item ticker-${item.type}`}>
                      <span className="ticker-separator">•</span>
                      <strong>{item.title}</strong>
                      <span className="ticker-text">{item.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="countdown-container">
              <div className="countdown">
                <div className="countdown-item">
                  <div className="countdown-number">{time.days}</div>
                  <div className="countdown-label">Days</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                  <div className="countdown-number">{time.hours}</div>
                  <div className="countdown-label">Hours</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                  <div className="countdown-number">{time.minutes}</div>
                  <div className="countdown-label">Minutes</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                  <div className="countdown-number">{time.seconds}</div>
                  <div className="countdown-label">Seconds</div>
                </div>
              </div>
            </div>

            <div className="hero-cta">
              <button className="cta-button primary" onClick={() => setView('register')}>
                <span className="cta-text">Register Now</span>
                <span className="cta-arrow">→</span>
                <div className="cta-glow"></div>
              </button>
              <button className="cta-button secondary" onClick={() => setView('events')}>
                <span className="cta-text">Explore Events</span>
                <span className="cta-icon">🎯</span>
              </button>
              <button className="cta-button tertiary" onClick={() => setView('schedule')}>
                <span className="cta-text">View Schedule</span>
                <span className="cta-icon">📅</span>
              </button>
            </div>

            <div className="hero-stats">
              {adminLoggedIn && (
                <div className="stat">
                  <div className="stat-number">{registeredCount}+</div>
                  <div className="stat-label">Registrations</div>
                </div>
              )}
              <div className="stat">
                <div className="stat-number">{events.length}</div>
                <div className="stat-label">Events</div>
              </div>
              <div className="stat">
                <div className="stat-number">08</div>
                <div className="stat-label">Hours</div>
              </div>
              <div className="stat">
                <div className="stat-number">{staticCoordinators.length}</div>
                <div className="stat-label">Coordinators</div>
              </div>
            </div>

            {/* Announcements */}
            <div className="announcements">
              <h3>📢 Latest Announcements</h3>
              <div className="announcement-list">
                <div className="announcement-item">
                  <span className="announcement-badge">NEW</span>
                  <p>Early bird registration ends Feb 6, 2026</p>
                </div>
                <div className="announcement-item">
                  <span className="announcement-badge">UPDATE</span>
                  <p>Offline Registration is Also Available @CAHCET Campus</p>
                </div>
                <div className="announcement-item">
                  <span className="announcement-badge">IMPORTANT</span>
                  <p>Team registration Vary Dynamics For Every Events</p>
                </div>
                <div className="announcement-item">
                  <span className="announcement-badge">Contact</span>
                  <p>If You have doubts, contact or whatsapp the coordinators</p>
                </div>
              </div>
            </div>

            {/* Event-Specific Rules Section */}
            <div className="event-rules-section">
              <h3>🎯 Event-Specific Rules</h3>
              <p className="event-rules-subtitle">Rules and requirements for each event</p>
              
              <div className="event-rules-filters">
                <button 
                  className={`event-rule-filter-btn ${!selectedEventRule ? 'active' : ''}`}
                  onClick={() => setSelectedEventRule(null)}
                >
                  All Events
                </button>
                {staticEventRules.map(eventRule => (
                  <button
                    key={eventRule.eventName}
                    className={`event-rule-filter-btn ${selectedEventRule === eventRule.eventName ? 'active' : ''}`}
                    onClick={() => setSelectedEventRule(eventRule.eventName)}
                  >
                    {eventRule.icon} {eventRule.eventName}
                  </button>
                ))}
              </div>

              <div className="event-rules-grid">
                {staticEventRules
                  .filter(eventRule => !selectedEventRule || eventRule.eventName === selectedEventRule)
                  .map((eventRule) => (
                  <div key={eventRule.eventName} className="event-rule-card">
                    <div className="event-rule-header">
                      <div className="event-rule-icon-large">{eventRule.icon}</div>
                      <div className="event-rule-title-section">
                        <h4>{eventRule.eventName}</h4>
                        <span className={`event-type-badge ${eventRule.eventType}`}>
                          {eventRule.eventType === 'tech' ? '⚡ Technical' : '🎨 Non-Technical'}
                        </span>
                      </div>
                    </div>
                    <div className="event-rule-image-container" onClick={() => setSelectedImageModal(eventRule.image)}>
                      <img src={eventRule.image} alt={eventRule.eventName} className="event-rule-image" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Modal */}
            {selectedImageModal && (
              <div className="image-modal-overlay" onClick={() => setSelectedImageModal(null)}>
                <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="image-modal-close" onClick={() => setSelectedImageModal(null)}>
                    <span>✕</span>
                  </button>
                  <img src={selectedImageModal} alt="Full view" className="image-modal-image" />
                  <button className="image-modal-close-btn" onClick={() => setSelectedImageModal(null)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="hero-visual">
            <div className="ai-core-animation">
              <div className="ai-core">
                <div className="ai-core-inner"></div>
              </div>
              <div className="ai-ring ai-ring-1"></div>
              <div className="ai-ring ai-ring-2"></div>
              <div className="ai-ring ai-ring-3"></div>
              <div className="ai-particle ai-particle-1"></div>
              <div className="ai-particle ai-particle-2"></div>
              <div className="ai-particle ai-particle-3"></div>
            </div>
          </div>
        </section>
      )}

      {/* About Page - STATIC */}
      {view === "about" && (
        <section className="page-section about-section">
          <div className="section-header">
            <h2 className="section-title">About AIRONIX</h2>
            <p className="section-subtitle">Where AI Innovation Begins</p>
          </div>

          <div className="about-content">
            <div className="about-card">
              <div className="about-icon">🤖</div>
              <h3>Our Mission</h3>
              <p>AIRONIX aims to inspire innovation and empower undergraduate students by bridging theory with real-world applications in Artificial Intelligence and Data Science. Our mission is to foster creativity, collaboration, and critical thinking through impactful technical and non-technical experiences that shape future-ready technologists.</p>
            </div>

            <div className="about-card">
              <div className="about-icon">🎯</div>
              <h3>Our Vision</h3>
              <p>To become a nationally recognized platform that nurtures innovation, inspires intelligent thinking, and empowers students to shape the future of Artificial Intelligence and Data Science with creativity, ethics, and impact.</p>
            </div>

            <div className="about-card">
              <div className="about-icon">🚀</div>
              <h3>What We Offer</h3>
              <p>Learn • Compete • Innovate • Connect</p>
            </div>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Expected Participants</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">05+</div>
              <div className="stat-label">Speakers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">08</div>
              <div className="stat-label">Hours</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Events</div>
            </div>
          </div>
        </section>
      )}

      {/* Events Page - DYNAMIC */}
      {view === "events" && (
        <section className="page-section events-section">
          <div className="section-header">
            <h2 className="section-title">Events & Competitions</h2>
            <p className="section-subtitle">Join cutting-edge AI challenges</p>
          </div>

          {/* Notice Board Section */}
          <div className="notice-board">
            <div className="notice-board-header">
              <span className="notice-icon">📌</span>
              <h3 className="notice-title">Important Notice</h3>
            </div>
            <div className="notice-board-content">
              <ul className="notice-list">
                <li><strong>Early Bird Registration:</strong> Register before Feb 6, 2026 to avail special rates</li>
                <li><strong>Team or Solo Participation:</strong> For some events, the registration fee is the same for both solo and team participation, as the event allows either solo or team entry. Please check the event heading to know whether the event is meant for solo participants or teams.</li>
                <li><strong>Team & Solo Participation:</strong> If you do not see any heading such as “Solo Event” or “Team Event,” it means the event is open to both solo and team participation. You can check the event description for more details.</li>
                <li><strong>Venue Confirmation:</strong> All events will be held at CAHCET Campus on Feb 7, 2026</li>
                <li><strong>Email Verification:</strong> A confirmation email will be sent to your registered email address</li>
              </ul>
            </div>
          </div>

          {/* Event Type Filter */}
          <div className="event-filters">
            <button 
              className={`filter-btn ${eventFilter === 'all' ? 'active' : ''}`}
              onClick={() => setEventFilter('all')}
            >
              All Events
            </button>
            <button 
              className={`filter-btn ${eventFilter === 'tech' ? 'active' : ''}`}
              onClick={() => setEventFilter('tech')}
            >
              Technical
            </button>
            <button 
              className={`filter-btn ${eventFilter === 'nontech' ? 'active' : ''}`}
              onClick={() => setEventFilter('nontech')}
            >
              Non-Technical
            </button>
            <button 
              className={`filter-btn ${eventFilter === 'workshop' ? 'active' : ''}`}
              onClick={() => setEventFilter('workshop')}
            >
              Workshops
            </button>
          </div>

          <div className="events-grid">
            {events
              .filter((event) => {
                if (eventFilter === 'all') return true;
                if (eventFilter === 'tech') return event.type === 'tech';
                if (eventFilter === 'nontech') return event.type === 'non-tech';
                if (eventFilter === 'workshop') return event.type === 'workshop';
                return true;
              })
              .map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-card-header">
                  <div className="event-icon">{event.type === 'tech' ? '⚡' : event.type === 'workshop' ? '🎓' : '🎨'}</div>
                  <div className="event-badges">
                    <div className="event-time-badge">{event.time}</div>
                    <div className="event-price-badge">₹{event.soloPrice || event.price} / ₹{event.teamPrice || event.price}</div>
                  </div>
                </div>
                <div className="event-card-body">
                  <h3>{event.title}</h3>
                  <div className="event-description-section">
                    <p>{truncateDescription(event.description, 150)}</p>
                    {event.description.length > 150 && (
                      <button 
                        className="show-description-link"
                        onClick={() => setSelectedEventDescription(event)}
                      >
                        View Full Description →
                      </button>
                    )}
                  </div>
                  <div className="event-meta">
                    <span className="event-venue">📍 {event.venue}</span>
                    {adminLoggedIn && (
                      <span className="event-capacity">👥 {event.registered}/{event.capacity}</span>
                    )}
                    {event.maxTeamParticipants && (
                      <span className="event-team-member">👥 Max Team Size: {event.maxTeamParticipants}</span>
                    )}
                    {event.maxTeamMembersRestricted && (
                      <span className="event-team-restriction">🔒 Team Max: {event.maxTeamMembersRestricted} members</span>
                    )}
                  </div>
                  {adminLoggedIn && (
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(event.registered / event.capacity) * 100}%` }}></div>
                    </div>
                  )}
                  <div className="event-pricing-info">
                    <small>Solo: ₹{event.soloPrice || event.price} | Team: ₹{event.teamPrice || event.price}</small>
                  </div>
                </div>
                <button className="event-card-button" onClick={() => {
                  setView('register');
                  setFormData(prev => ({ ...prev, event: event.title }));
                }}>
                  Register Now
                  <span className="button-sparkle">✨</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Schedule Page - STATIC */}
      {view === "schedule" && (
        <section className="page-section schedule-section">
          <div className="section-header">
            <h2 className="section-title">Event Schedule</h2>
            <p className="section-subtitle">February 7, 2026 | CAHCET</p>
          </div>

          <div className="timeline">
            {staticSchedule.map((item, index) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-number">{index + 1}</div>
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-time">{item.time}</div>
                  <h3>{item.event}</h3>
                  <p className="timeline-venue">📍 {item.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Register Page - DYNAMIC */}
      {view === "register" && (
        <section className="page-section register-section">
          <div className="section-header">
            <h2 className="section-title">Register for AIRONIX 2026</h2>
            <p className="section-subtitle">Secure your spot in the premier AI symposium</p>
          </div>

          <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
              {/* Registration Type */}
              <div className="registration-type-selector">
                <h3>Participation Type</h3>
                <p className="type-help-text">Select whether you want to participate solo or as part of a team</p>
                <div className="type-options">
                  <button
                    type="button"
                    className={`type-option ${registrationType === 'solo' ? 'active' : ''}`}
                    onClick={() => {
                      setRegistrationType('solo');
                      setFormData(prev => ({ ...prev, teamSize: '1' }));
                      setTeamMembers([{ id: 1, name: "", email: "", phone: "", college: "" }]);
                      // Update price when switching to solo
                      const selectedEvent = events.find(event => event.title === formData.event);
                      if (selectedEvent) {
                        setPaymentAmount(selectedEvent.soloPrice || selectedEvent.price);
                      }
                    }}
                  >
                    <span className="type-icon">👤</span>
                    <div className="type-content">
                      <h4>Solo Participant</h4>
                      <p>Register as an individual</p>
                      {formData.event && (
                        <div className="pricing-info">
                          <span className="price-label">Price: </span>
                          <span className="price-value">₹{events.find(e => e.title === formData.event)?.soloPrice || events.find(e => e.title === formData.event)?.price || '—'}</span>
                        </div>
                      )}
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`type-option ${registrationType === 'team' ? 'active' : ''}`}
                    onClick={() => {
                      setRegistrationType('team');
                      // Update price when switching to team
                      const selectedEvent = events.find(event => event.title === formData.event);
                      if (selectedEvent) {
                        setPaymentAmount(selectedEvent.teamPrice || selectedEvent.price);
                      }
                    }}
                  >
                    <span className="type-icon">👥</span>
                    <div className="type-content">
                      <h4>Team Registration</h4>
                      <p>Register as a team (Dynamic)</p>
                      {formData.event && (
                        <div className="pricing-info">
                          <span className="price-label">Price: </span>
                          <span className="price-value">₹{events.find(e => e.title === formData.event)?.teamPrice || events.find(e => e.title === formData.event)?.price || '—'}</span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Team Details */}
              {registrationType === 'team' && (
                <div className="team-details-section">
                  <h3>Team Details</h3>
                  {(() => {
                    const selectedEvent = events.find(e => e.title === formData.event);
                    const maxRestriction = selectedEvent?.maxTeamMembersRestricted;
                    return (
                      <>
                        {maxRestriction && (
                          <div className="restriction-notice" style={{
                            padding: '10px',
                            marginBottom: '15px',
                            backgroundColor: '#fff3cd',
                            border: '1px solid #ffc107',
                            borderRadius: '4px',
                            color: '#856404'
                          }}>
                            <strong>⚠️ Team Restriction:</strong> This event limits team participation to maximum <strong>{maxRestriction} members</strong>.
                          </div>
                        )}
                        <div className="form-group">
                          <label>Team Name *</label>
                          <input
                            type="text"
                            placeholder="Enter your team name"
                            name="teamName"
                            value={formData.teamName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Team Size *</label>
                          <select
                            name="teamSize"
                            value={formData.teamSize}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="1">1 Member</option>
                            <option value="2">2 Members</option>
                            <option value="3" disabled={maxRestriction && maxRestriction < 3}>3 Members{maxRestriction && maxRestriction < 3 ? ' (Not allowed)' : ''}</option>
                            <option value="4" disabled={maxRestriction && maxRestriction < 4}>4 Members{maxRestriction && maxRestriction < 4 ? ' (Not allowed)' : ''}</option>
                            <option value="5" disabled={maxRestriction && maxRestriction < 5}>5 Members{maxRestriction && maxRestriction < 5 ? ' (Not allowed)' : ''}</option>
                            <option value="6" disabled={maxRestriction && maxRestriction < 6}>6 Members{maxRestriction && maxRestriction < 6 ? ' (Not allowed)' : ''}</option>
                          </select>
                          {maxRestriction && parseInt(formData.teamSize) > maxRestriction && (
                            <small style={{ color: 'red' }}>⚠️ Team size exceeds the event restriction of {maxRestriction} members</small>
                          )}
                        </div>
                      </>
                    );
                  })()}

                  <div className="team-members-section">
                    <h4>Team Members</h4>
                    {teamMembers.map((member, index) => (
                      <div key={member.id} className="team-member-card">
                        <div className="member-header">
                          <h5>Member {index + 1}</h5>
                          {teamMembers.length > 1 && (
                            <button
                              type="button"
                              className="remove-member-btn"
                              onClick={() => removeTeamMember(index)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="member-fields">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={member.name}
                            onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                            required
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={member.email}
                            onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                            required
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={member.phone}
                            onChange={(e) => handleTeamMemberChange(index, 'phone', e.target.value)}
                            required
                          />
                          <input
                            type="text"
                            placeholder="College/University"
                            value={member.college}
                            onChange={(e) => handleTeamMemberChange(index, 'college', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    ))}
                    {(() => {
                      const selectedEvent = events.find(e => e.title === formData.event);
                      const maxRestriction = selectedEvent?.maxTeamMembersRestricted;
                      const canAddMore = !maxRestriction ? teamMembers.length < 4 : teamMembers.length < Math.min(4, maxRestriction);
                      return canAddMore && (
                        <button type="button" className="add-member-btn" onClick={addTeamMember}>
                          <span>+ Add Team Member</span>
                        </button>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Personal Details */}
              <div className="personal-details-section">
                <h3>Personal Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>College/University *</label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      placeholder="College name"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Department *</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      placeholder="Computer Science, IT, etc."
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Year of Study *</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="5">5th Year</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Event Selection */}
              <div className="form-group">
                <label>Select Event *</label>
                <div className="event-selection-container">
                  <select
                    name="event"
                    value={formData.event}
                    onChange={handleInputChange}
                    required
                    className="event-select"
                  >
                    <option value="">Choose an event</option>
                    {events.map(event => (
                      <option key={event.id} value={event.title}>
                        {event.title} - Solo: ₹{event.soloPrice || event.price} | Team: ₹{event.teamPrice || event.price}
                      </option>
                    ))}
                  </select>
                  {formData.event && (
                    <div className="event-pricing-card">
                      <h5>Pricing for: {formData.event}</h5>
                      <div className="pricing-comparison">
                        <div className={`price-option ${registrationType === 'solo' ? 'selected' : ''}`}>
                          <span className="option-label">Solo</span>
                          <span className="option-price">₹{events.find(e => e.title === formData.event)?.soloPrice || events.find(e => e.title === formData.event)?.price}</span>
                        </div>
                        <div className="pricing-divider">vs</div>
                        <div className={`price-option ${registrationType === 'team' ? 'selected' : ''}`}>
                          <span className="option-label">Team</span>
                          <span className="option-price">₹{events.find(e => e.title === formData.event)?.teamPrice || events.find(e => e.title === formData.event)?.price}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Amount Display */}
              {formData.event && (
                <div className="amount-display">
                  <h4>Payment Details</h4>
                  <div className="amount-details">
                    {registrationType === 'solo' ? (
                      <div className="amount-row">
                        <span>Solo Registration Fee:</span>
                        <span>₹{paymentAmount}</span>
                      </div>
                    ) : (
                      <>
                        <div className="amount-row">
                          <span>Team Size:</span>
                          <span>{formData.teamSize} members</span>
                        </div>
                        <div className="amount-row">
                          <span>Team Registration Fee:</span>
                          <span>₹{paymentAmount}</span>
                        </div>
                      </>
                    )}
                    <div className="amount-row total">
                      <span>Total Amount:</span>
                      <span className="total-amount">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Section */}
              <div className="payment-container">
                <div className="payment-header">
                  <h3>Payment Instructions</h3>
                  <p>Complete your registration by making the payment</p>
                </div>

                <div className="qr-payment-section">
                  <div className="qr-container">
                    <h4>💳 Scan QR Code to Pay</h4>
                    <div className="qr-code">
                      <img src={qrCodeImage} alt="Payment QR Code" className="qr-image" />
                    </div>
                    <div className="payment-details">
                      <div className="payment-info">
                        <span>Total Amount:</span>
                        <span className="amount">₹{calculateTotal()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="payment-upload-section">
                    <h4>📸 Upload Payment Proof</h4>
                    <p>Complete verification by uploading your payment screenshot</p>

                    <div className="upload-area">
                      <input
                        type="file"
                        id="payment-screenshot"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="file-input"
                      />
                      <label htmlFor="payment-screenshot" className="upload-label">
                        {uploadSuccess ? (
                          <div className="upload-preview">
                            <span className="upload-success">✅</span>
                            <div className="upload-text">
                              <p>Screenshot uploaded!</p>
                              <small>{uploadedFile?.name}</small>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="upload-icon">📁</div>
                            <div className="upload-text">
                              <p>Click to upload payment screenshot</p>
                              <small>JPG, PNG or PDF (Max 5MB)</small>
                            </div>
                          </>
                        )}
                      </label>
                    </div>

                    <div className="payment-instructions">
                      <h5>Payment Instructions</h5>
                      <ul>
                        <li>Scan and complete payment using the QR code</li>
                        <li>Ensure your payment screenshot is clear and visible</li>
                        <li>Add your name and event name in payment notes (if applicable)</li>
                        <li>Verification typically takes 1 hour</li>
                        <li>Confirmation email will be sent after verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-button" disabled={!uploadSuccess || loading}>
                {loading ? (
                  <>
                    <span>Processing...</span>
                    <div className="button-spinner"></div>
                  </>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <div className="button-glow"></div>
                    <span className="button-sparkle">🎉</span>
                  </>
                )}
              </button>
            </form>

            <div className="register-info">
              <div className="info-card">
                <h3>Registration Details</h3>
                <ul>
                  <li>
                    <span className="info-icon">📅</span>
                    <div>
                      <strong>Early Bird Registration</strong>
                      <p>Until Feb 6, 2026</p>
                    </div>
                  </li>
                  <li>
                    <span className="info-icon">🎟️</span>
                    <div>
                      <strong>Team Registration</strong>
                      <p>Dynamic For Each Events</p>
                    </div>
                  </li>
                  <li>
                    <span className="info-icon">💰</span>
                    <div>
                      <strong>Registration Fee</strong>
                      <p>Varies by event</p>
                    </div>
                  </li>
                  <li>
                    <span className="info-icon">📧</span>
                    <div>
                      <strong>Confirmation</strong>
                      <p>Sent after payment verification</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Rules Page - STATIC */}
      {view === "rules" && (
        <section className="page-section rules-section">
          <div className="section-header">
            <h2 className="section-title">Rules & Guidelines</h2>
            <p className="section-subtitle">Ensure fair play and innovation</p>
          </div>

          <div className="rules-grid">
            {staticRules.map((rule) => (
              <div key={rule.id} className="rule-card">
                <div className="rule-icon">📋</div>
                <div className="rule-content">
                  <h3>{rule.title}</h3>
                  <p>{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Team Page - STATIC */}
      {view === "team" && (
        <section className="page-section team-section">
          <div className="section-header">
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">Meet the coordinators behind AIRONIX 2026</p>
          </div>

          <div className="coordinators-grid">
            {staticCoordinators.map((coordinator) => (
              <div key={coordinator.id} className="coordinator-card">
                <div className="coordinator-info">
                  <h3>{coordinator.name}</h3>
                  <p className="coordinator-role">{coordinator.role}</p>
                  <div className="coordinator-contact">
                    <p><span className="contact-icon">📧</span> {coordinator.email}</p>
                    <p><span className="contact-icon">📱</span> {coordinator.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sponsors Page - STATIC */}
      {view === "sponsors" && (
        <section className="page-section sponsors-section">
          <div className="section-header">
            <h2 className="section-title">Our Sponsors</h2>
            <p className="section-subtitle">“We extend our sincere appreciation to our sponsors whose dedication and support empower our work and strengthen our community.”</p>
          </div>

          <div className="sponsors-container">
            <div className="sponsor-level elite">
              <h3>Elite Sponsors</h3>
              <div className="sponsor-logos">
                {staticSponsors.filter(s => s.level === "Elite").map(sponsor => (
                  <div key={sponsor.id} className="sponsor-logo">
                    {typeof sponsor.logo === 'string' && sponsor.logo.length === 2 ? (
                      <span className="logo-icon">{sponsor.logo}</span>
                    ) : (
                      <img src={sponsor.logo} alt={sponsor.name} className="logo-image" />
                    )}
                    <h4 
                      onClick={() => window.open(sponsor.website, '_blank')} 
                      style={{ cursor: 'pointer' }}
                      title={`Visit ${sponsor.name}`}
                    >
                      {sponsor.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="sponsor-level premium">
              <h3>Premium Sponsors</h3>
              <div className="sponsor-logos">
                {staticSponsors.filter(s => s.level === "Premium").map(sponsor => (
                  <div key={sponsor.id} className="sponsor-logo">
                    {typeof sponsor.logo === 'string' && sponsor.logo.length === 2 ? (
                      <span className="logo-icon">{sponsor.logo}</span>
                    ) : (
                      <img src={sponsor.logo} alt={sponsor.name} className="logo-image" />
                    )}
                    <h4 
                      onClick={() => window.open(sponsor.website, '_blank')} 
                      style={{ cursor: 'pointer' }}
                      title={`Visit ${sponsor.name}`}
                    >
                      {sponsor.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="sponsor-level standard">
              <h3>Standard Sponsors</h3>
              <div className="sponsor-logos">
                {staticSponsors.filter(s => s.level === "Standard").map(sponsor => (
                  <div key={sponsor.id} className="sponsor-logo">
                    {typeof sponsor.logo === 'string' && sponsor.logo.length === 2 ? (
                      <span className="logo-icon">{sponsor.logo}</span>
                    ) : (
                      <img src={sponsor.logo} alt={sponsor.name} className="logo-image" />
                    )}
                    <h4 
                      onClick={() => window.open(sponsor.website, '_blank')} 
                      style={{ cursor: 'pointer' }}
                      title={`Visit ${sponsor.name}`}
                    >
                      {sponsor.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Page - STATIC */}
      {view === "gallery" && (
        <section className="page-section gallery-section">
          <div className="section-header">
            <h2 className="section-title">Gallery</h2>
            <p className="section-subtitle">Moments from previous editions</p>
          </div>

          <div className="gallery-filters">
            <button className="gallery-filter active">All Photos</button>
            <button className="gallery-filter">Events</button>
            <button className="gallery-filter">Workshops</button>
            <button className="gallery-filter">Tech</button>
            <button className="gallery-filter">Non-Tech</button>
          </div>

          <div className="gallery-grid">
            {staticGallery.map((image) => (
              <div key={image.id} className="gallery-item">
                <div className="gallery-image" style={{ backgroundImage: `url(${image.url})` }}>
                  <div className="gallery-overlay">
                    <span className="gallery-category">{image.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Page - STATIC */}
      {view === "contact" && (
        <section className="page-section contact-section">
          <div className="section-header">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-subtitle">Get in touch with our team</p>
          </div>

          <div className="contact-container">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  placeholder="How can we help?"
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="Your message..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                <span>Send Message</span>
                <div className="button-glow"></div>
                <span className="button-sparkle">✉️</span>
              </button>
            </form>

            <div className="contact-info">
              <div className="info-card">
                <h3>Contact Information</h3>
                <ul>
                  <li>
                    <span className="info-icon">📍</span>
                    <div>
                      <strong>Location</strong>
                      <p>CAHCET<br />Anna Salai Road Melvisharam<br />Ranipet, 632509</p>
                    </div>
                  </li>
                  <li>
                    <span className="info-icon">📧</span>
                    <div>
                      <strong>Email</strong>
                      <p>aironix26@gmail.com</p>
                    </div>
                  </li>
                  <li>
                    <span className="info-icon">📱</span>
                    <div>
                      <strong>Phone</strong>
                      <p>9600159063 - Mohamed Melhan K O<br />6374154994 - Abrar A <br />6374892929 - Md. Talha C</p>
                    </div>
                  </li>
                  <li>
                    <span className="info-icon"></span>
                    <div>
                      <strong>Queries</strong>
                      <p>9600159063 - Mohamed Melhan K O (Registration Queries)</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Admin Panel */}
      {adminLoggedIn && view === "admin" && (
        <section className="page-section admin-section">
          <div className="admin-header">
            <div className="admin-header-content">
              <h2 className="section-title">Admin Panel</h2>
              <p className="section-subtitle">Manage all aspects of AIRONIX 2026</p>
              <button className="logout-btn" onClick={() => {
                setAdminLoggedIn(false);
                setAdminToken("");
                setView('home');
                localStorage.removeItem('adminToken');
              }}>
                <span>🚪</span>
                Logout
              </button>
            </div>
          </div>

          {/* Admin Navigation */}
          <div className="admin-nav-tabs">
            <button
              className={`admin-tab ${adminView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setAdminView('dashboard')}
            >
              📊 Dashboard
            </button>
            <button
              className={`admin-tab ${adminView === 'registrations' ? 'active' : ''}`}
              onClick={() => setAdminView('registrations')}
            >
              📝 Registrations
            </button>
            <button
              className={`admin-tab ${adminView === 'events' ? 'active' : ''}`}
              onClick={() => setAdminView('events')}
            >
              🎪 Manage Events
            </button>
          </div>

          {/* Admin Dashboard */}
          {adminView === 'dashboard' && (
            <div className="admin-dashboard">
              <div className="dashboard-stats">
                <div className="stat-card">
                  <div className="stat-card-icon">👥</div>
                  <div className="stat-card-content">
                    <h3>{registeredCount}</h3>
                    <p>Total Registrations</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-icon">💰</div>
                  <div className="stat-card-content">
                    <h3>₹{registrations.reduce((sum, reg) => sum + (parseFloat(reg.total_amount) || 0), 0)}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-icon">✅</div>
                  <div className="stat-card-content">
                    <h3>{registrations.filter(r => r.status === 'approved').length}</h3>
                    <p>Verified Payments</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-icon">⏳</div>
                  <div className="stat-card-content">
                    <h3>{registrations.filter(r => r.status === 'pending').length}</h3>
                    <p>Pending Verification</p>
                  </div>
                </div>
              </div>

              <div className="admin-quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button className="action-btn" onClick={() => setAdminView('registrations')}>
                    <span>📝 View Registrations</span>
                  </button>
                  <button className="action-btn" onClick={exportToExcel}>
                    <span>📥 Export to Excel</span>
                  </button>
                  <button className="action-btn" onClick={exportToPDF}>
                    <span>📄 Export to PDF</span>
                  </button>
                  <button className="action-btn" onClick={() => setAdminView('events')}>
                    <span>🎪 Manage Events</span>
                  </button>
                </div>
              </div>

              <div className="admin-recent-activity">
                <h3>Recent Registrations</h3>
                <div className="activity-list">
                  {registrations.slice(0, 5).map(reg => (
                    <div key={reg.id} className="activity-item">
                      <div className="activity-icon">📝</div>
                      <div className="activity-content">
                        <p><strong>{reg.name}</strong></p>
                        <small>Registered for {reg.event} - ₹{reg.total_amount}</small>
                      </div>
                      <div className="activity-time">
                        <span className={`status-badge ${reg.status}`}>
                          {reg.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Registrations Management */}
          {adminView === 'registrations' && (
            <div className="admin-registrations">
              <div className="admin-section-header">
                <h3>Manage Registrations</h3>
                <div className="export-buttons">
                  <button onClick={exportToExcel} className="export-btn">
                    📥 Export Excel
                  </button>
                  <button onClick={exportToPDF} className="export-btn">
                    📄 Export PDF
                  </button>
                </div>
              </div>

              <div className="registrations-table-container">
                <table className="registrations-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Event</th>
                      <th>Amount</th>
                      <th>Type</th>
                      <th>Team Info</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map(reg => (
                      <tr key={reg.id}>
                        <td>#{reg.id}</td>
                        <td>{reg.name}</td>
                        <td>{reg.email}</td>
                        <td>{reg.event_title}</td>
                        <td>₹{reg.total_amount}</td>
                        <td>{reg.registration_type}</td>
                        <td>
                          {reg.registration_type === 'team' ? (
                            <span className="team-badge" title={`Team: ${reg.team_name || 'N/A'} (${reg.team_size} members)`}>
                              👥 Team ({reg.team_size})
                            </span>
                          ) : (
                            <span className="solo-badge">👤 Solo</span>
                          )}
                        </td>
                        <td>{new Date(reg.created_at).toLocaleDateString()}</td>
                        <td>
                          <span className={`status-badge ${reg.status}`}>
                            {reg.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons-small">
                            {reg.status === 'pending' && (
                              <>
                                <button
                                  className="approve-btn"
                                  onClick={() => updateRegistrationStatus(reg.id, 'approved')}
                                >
                                  ✓
                                </button>
                                <button
                                  className="reject-btn"
                                  onClick={() => updateRegistrationStatus(reg.id, 'rejected')}
                                >
                                  ✗
                                </button>
                              </>
                            )}
                            <button
                              className="view-btn"
                              onClick={() => {
                                if (reg.registration_type === 'team' || (reg.team_members && reg.team_members !== '[]' && reg.team_members !== null)) {
                                  setSelectedTeamRegistration(reg);
                                } else {
                                  let detailsMessage = `Name: ${reg.name}\nEmail: ${reg.email}\nPhone: ${reg.phone}\nCollege: ${reg.college}\nDepartment: ${reg.department}\nYear: ${reg.year}`;
                                  alert(detailsMessage);
                                }
                              }}
                            >
                              👁️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Events Management */}
          {adminView === 'events' && (
            <div className="admin-events">
              <div className="admin-section-header">
                <h3>Manage Events</h3>
              </div>

              {/* Add Event Form */}
              <div className="admin-form-section">
                <h4>{editingEvent ? 'Edit Event' : 'Add New Event'}</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Event Title *</label>
                    <input
                      type="text"
                      value={editingEvent ? editingEvent.title : newEvent.title}
                      onChange={(e) => editingEvent ?
                        setEditingEvent({ ...editingEvent, title: e.target.value }) :
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="form-group">
                    <label>Time *</label>
                    <input
                      type="text"
                      value={editingEvent ? editingEvent.time : newEvent.time}
                      onChange={(e) => editingEvent ?
                        setEditingEvent({ ...editingEvent, time: e.target.value }) :
                        setNewEvent({ ...newEvent, time: e.target.value })
                      }
                      placeholder="e.g., 10:00 AM"
                    />
                  </div>
                  <div className="form-group">
                    <label>Venue *</label>
                    <input
                      type="text"
                      value={editingEvent ? editingEvent.venue : newEvent.venue}
                      onChange={(e) => editingEvent ?
                        setEditingEvent({ ...editingEvent, venue: e.target.value }) :
                        setNewEvent({ ...newEvent, venue: e.target.value })
                      }
                      placeholder="Enter venue"
                    />
                  </div>
                  <div className="form-group">
                    <label>Capacity *</label>
                    <input
                      type="number"
                      value={editingEvent ? editingEvent.capacity : newEvent.capacity}
                      onChange={(e) => editingEvent ?
                        setEditingEvent({ ...editingEvent, capacity: e.target.value }) :
                        setNewEvent({ ...newEvent, capacity: e.target.value })
                      }
                      placeholder="Enter capacity"
                    />
                  </div>
                  <div className="form-group">
                    <label>Base Price (Backup) *</label>
                    <input
                      type="number"
                      value={editingEvent ? editingEvent.price : newEvent.price}
                      onChange={(e) => editingEvent ?
                        setEditingEvent({ ...editingEvent, price: e.target.value }) :
                        setNewEvent({ ...newEvent, price: e.target.value })
                      }
                      placeholder="Enter base price"
                    />
                  </div>
                  <div className="form-group">
                    <label>Solo Participation Price *</label>
                    <input
                      type="number"
                      value={editingEvent ? (editingEvent.soloPrice || '') : (newEvent.soloPrice || '')}
                      onChange={(e) => editingEvent ?
                        setEditingEvent({ ...editingEvent, soloPrice: e.target.value }) :
                        setNewEvent({ ...newEvent, soloPrice: e.target.value })
                      }
                      placeholder="Enter solo price"
                    />
                  </div>
                  <div className="form-group">
                    <label>Team Participation Price *</label>
                    <input
                      type="number"
                      value={editingEvent ? (editingEvent.teamPrice || '') : (newEvent.teamPrice || '')}
                      onChange={(e) => editingEvent ?
                        setEditingEvent({ ...editingEvent, teamPrice: e.target.value }) :
                        setNewEvent({ ...newEvent, teamPrice: e.target.value })
                      }
                      placeholder="Enter team price"
                    />
                  </div>
                  <div className="form-group">
                    <label>Type *</label>
                    <select
                      value={editingEvent ? editingEvent.type : newEvent.type}
                      onChange={(e) => editingEvent ?
                        setEditingEvent({ ...editingEvent, type: e.target.value }) :
                        setNewEvent({ ...newEvent, type: e.target.value })
                      }
                    >
                      <option value="tech">Technical</option>
                      <option value="non-tech">Non-Technical</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Number of Participants Can Team Up *</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter number of participants for team"
                      value={editingEvent ? (editingEvent.maxTeamParticipants || '') : (newEvent.maxTeamParticipants || '')}
                      onChange={(e) => editingEvent ?
                        setEditingEvent({ ...editingEvent, maxTeamParticipants: e.target.value }) :
                        setNewEvent({ ...newEvent, maxTeamParticipants: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Restrict Team Members Count (Optional)</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Maximum team members allowed (leave empty for no restriction)"
                      value={editingEvent ? (editingEvent.maxTeamMembersRestricted || '') : (newEvent.maxTeamMembersRestricted || '')}
                      onChange={(e) => editingEvent ?
                        setEditingEvent({ ...editingEvent, maxTeamMembersRestricted: e.target.value }) :
                        setNewEvent({ ...newEvent, maxTeamMembersRestricted: e.target.value })
                      }
                    />
                    <small>Set a maximum number of team members for this event. Leave empty for no restriction.</small>
                  </div>
                  <div className="form-group">
                    <label>Description *</label>
                    <textarea
                      value={editingEvent ? editingEvent.description : newEvent.description}
                      onChange={(e) => editingEvent ?
                        setEditingEvent({ ...editingEvent, description: e.target.value }) :
                        setNewEvent({ ...newEvent, description: e.target.value })
                      }
                      placeholder="Enter event description"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="form-buttons">
                  {editingEvent ? (
                    <>
                      <button onClick={handleUpdateEvent} className="update-btn">
                        Update Event
                      </button>
                      <button onClick={() => setEditingEvent(null)} className="cancel-btn">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={handleAddEvent} className="add-btn">
                      Add Event
                    </button>
                  )}
                </div>
              </div>

              {/* Events List */}
              <div className="events-list-admin">
                <h4>Current Events</h4>
                {events.map(event => (
                  <div key={event.id} className="event-item-admin">
                    <div className="event-info">
                      <h5>{event.title}</h5>
                      <div className="event-description-section">
                        <p>{truncateDescription(event.description, 150)}</p>
                        {event.description.length > 150 && (
                          <button 
                            className="show-description-link"
                            onClick={() => setSelectedEventDescription(event)}
                          >
                            View Full Description →
                          </button>
                        )}
                      </div>
                      <div className="event-meta">
                        <span>⏰ {event.time}</span>
                        <span>📍 {event.venue}</span>
                        <span>💰 Solo: ₹{event.soloPrice || event.price} | Team: ₹{event.teamPrice || event.price}</span>
                        <span>👥 {event.registered}/{event.capacity}</span>
                        <span>{event.type === 'tech' ? '⚡' : '🎨'} {event.type}</span>
                        {event.maxTeamParticipants && (
                          <span>👥 Max Team Participants: {event.maxTeamParticipants}</span>
                        )}
                      </div>
                    </div>
                    <div className="event-actions">
                      <button
                        className="edit-btn"
                        onClick={() => setEditingEvent(event)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Team Members Detail Modal */}
      {selectedTeamRegistration && (
        <div className="modal-overlay" onClick={() => setSelectedTeamRegistration(null)}>
          <div className="team-members-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>👥 Team Registration Details</h2>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedTeamRegistration(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* Lead Details */}
              <div className="team-section">
                <h3 className="team-section-title">👤 Team Lead</h3>
                <div className="member-card team-lead-card">
                  <div className="member-field">
                    <label>Name:</label>
                    <p>{selectedTeamRegistration.name}</p>
                  </div>
                  <div className="member-field">
                    <label>Email:</label>
                    <p>{selectedTeamRegistration.email}</p>
                  </div>
                  <div className="member-field">
                    <label>Phone:</label>
                    <p>{selectedTeamRegistration.phone}</p>
                  </div>
                  <div className="member-field">
                    <label>College:</label>
                    <p>{selectedTeamRegistration.college}</p>
                  </div>
                  <div className="member-field">
                    <label>Department:</label>
                    <p>{selectedTeamRegistration.department || 'N/A'}</p>
                  </div>
                  <div className="member-field">
                    <label>Year:</label>
                    <p>{selectedTeamRegistration.year || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Team Information */}
              <div className="team-section">
                <h3 className="team-section-title">🎯 Team Information</h3>
                <div className="team-info-box">
                  <div className="info-item">
                    <label>Team Name:</label>
                    <span className="team-name">{selectedTeamRegistration.team_name || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <label>Team Size:</label>
                    <span>{selectedTeamRegistration.team_size} members</span>
                  </div>
                  <div className="info-item">
                    <label>Event:</label>
                    <span>{selectedTeamRegistration.event_title}</span>
                  </div>
                  <div className="info-item">
                    <label>Total Amount:</label>
                    <span className="amount">₹{selectedTeamRegistration.total_amount}</span>
                  </div>
                </div>
              </div>

              {/* Team Members List */}
              {selectedTeamRegistration.team_members && (
                <div className="team-section">
                  <h3 className="team-section-title">👥 Team Members</h3>
                  <div className="members-list">
                    {(() => {
                      try {
                        let teamMembers = selectedTeamRegistration.team_members;

                        // Handle if it's already an object
                        if (typeof teamMembers === 'object' && !Array.isArray(teamMembers)) {
                          teamMembers = Array.isArray(teamMembers) ? teamMembers : [teamMembers];
                        } else if (typeof teamMembers === 'string') {
                          // Parse if it's a JSON string
                          teamMembers = JSON.parse(teamMembers);
                        }

                        // Ensure it's an array
                        if (!Array.isArray(teamMembers)) {
                          return <p className="error-message">No team members data available</p>;
                        }

                        if (teamMembers.length === 0) {
                          return <p className="error-message">No team members listed</p>;
                        }

                        return teamMembers.map((member, index) => (
                          <div key={index} className="member-card">
                            <div className="member-number">#{index + 1}</div>
                            <div className="member-field">
                              <label>Name:</label>
                              <p>{member.name || 'N/A'}</p>
                            </div>
                            <div className="member-field">
                              <label>Email:</label>
                              <p>{member.email || 'N/A'}</p>
                            </div>
                            <div className="member-field">
                              <label>Phone:</label>
                              <p>{member.phone || 'N/A'}</p>
                            </div>
                            <div className="member-field">
                              <label>College:</label>
                              <p>{member.college || 'N/A'}</p>
                            </div>
                          </div>
                        ));
                      } catch (e) {
                        console.error('Error parsing team members:', e);
                        return <p className="error-message">Unable to parse team members data: {e.message}</p>;
                      }
                    })()}
                  </div>
                </div>
              )}

              {/* Verification Status */}
              <div className="team-section">
                <h3 className="team-section-title">✓ Registration Status</h3>
                <div className="status-box">
                  <div className="status-item">
                    <label>Verification Status:</label>
                    <span className={`status-badge ${selectedTeamRegistration.status}`}>
                      {selectedTeamRegistration.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="status-item">
                    <label>Registration Date:</label>
                    <span>{new Date(selectedTeamRegistration.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="close-modal-btn"
                onClick={() => setSelectedTeamRegistration(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">Developed By Techsalute</p>
          <p className="footer-text">Organized By Department Of Artificial Intelligence & Data Science</p>
        </div>
      </footer>
    </div>
  );
}

export default App;