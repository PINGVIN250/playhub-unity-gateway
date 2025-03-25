
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <PageTitle 
            title="About UnityPlay"
            description="Our mission and vision for the Unity game platform"
          />
          
          <div className="glass-card p-8 mb-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-6">
                UnityPlay was created with a simple mission: to provide Unity developers with a platform to showcase their games and connect with players worldwide. Our team of passionate gamers and developers built this platform to support the growing community of independent game creators.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Why Unity WebGL?</h2>
              <p className="text-muted-foreground mb-6">
                Unity's WebGL build option allows games to run directly in the browser without requiring players to download or install anything. This creates a frictionless experience for players and a wider audience for developers. We believe in the power of web-based gaming to make great experiences more accessible to everyone.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground mb-6">
                We envision a future where independent game developers can easily share their creations with the world, receive valuable feedback, and build communities around their games. UnityPlay aims to be the bridge that connects talented developers with enthusiastic players.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">For Developers</h2>
              <p className="text-muted-foreground mb-6">
                If you're a Unity developer, UnityPlay offers a simple way to upload your WebGL builds and share them with the world. Create an account, upload your game, and start collecting feedback from players. Our platform handles the hosting and provides you with insights into how players are engaging with your creation.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">For Players</h2>
              <p className="text-muted-foreground mb-6">
                Discover new and exciting games from talented developers around the world. Play directly in your browser without downloads or installations. Support independent game creators by playing their games and providing feedback.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
              <p className="text-muted-foreground">
                Whether you're a developer looking to showcase your games or a player eager to discover new experiences, we invite you to join the UnityPlay community. Together, we can build a vibrant platform that celebrates creativity and innovation in game development.
              </p>
            </div>
          </div>
          
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Meet The Team</h2>
            <p className="text-muted-foreground mb-12">
              Our team is made up of passionate gamers, developers, and designers who believe in the power of indie game development.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Alex Johnson</h3>
                <p className="text-muted-foreground">Founder & Lead Developer</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Maria Rodriguez</h3>
                <p className="text-muted-foreground">UX Designer</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">David Chen</h3>
                <p className="text-muted-foreground">Community Manager</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
