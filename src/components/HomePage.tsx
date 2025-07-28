import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button.tsx';
import { Card } from './ui/card.tsx';
import { signOut } from '../utils/supabase.ts';

interface HomePageProps {
  user?: any; // User object from Supabase Auth
}

const HomePage = ({ user }: HomePageProps) => {
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center py-20 bg-gradient-to-b from-purple-900 to-indigo-800 text-white">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">MuseConnect</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect, collaborate, and create with musicians and instrumentalists who share your passion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-800">
                  <Link to="/signin">Sign In</Link>
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-800" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Musicians Love MuseConnect</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 shadow-md">
              <div className="text-3xl mb-4 text-indigo-600">🎵</div>
              <h3 className="text-xl font-bold mb-2">Find Your Musical Match</h3>
              <p className="text-gray-600">
                Discover musicians by instrument, genre, location, and availability to form your ideal collaboration.
              </p>
            </Card>
            
            <Card className="p-6 shadow-md">
              <div className="text-3xl mb-4 text-indigo-600">💬</div>
              <h3 className="text-xl font-bold mb-2">Seamless Communication</h3>
              <p className="text-gray-600">
                Chat directly with potential collaborators, share ideas, and coordinate projects all in one place.
              </p>
            </Card>
            
            <Card className="p-6 shadow-md">
              <div className="text-3xl mb-4 text-indigo-600">🚀</div>
              <h3 className="text-xl font-bold mb-2">Grow Your Network</h3>
              <p className="text-gray-600">
                Build a portfolio, showcase your work, and connect with a community of like-minded musicians.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Musicians Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 shadow-sm">
              <p className="italic mb-4">"MuseConnect helped me find the perfect vocalist for my EP. The platform made collaboration easy and efficient."</p>
              <p className="font-semibold">- Alex J., Producer</p>
            </Card>
            
            <Card className="p-6 shadow-sm">
              <p className="italic mb-4">"I moved to a new city and found my bandmates through MuseConnect within weeks. Now we're touring together!"</p>
              <p className="font-semibold">- Sarah M., Guitarist</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-700 to-purple-800 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of musicians already collaborating on MuseConnect
          </p>
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
            <Link to="/signup">Create Your Profile</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container px-4 mx-auto text-center">
          <p>© 2023 MuseConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;