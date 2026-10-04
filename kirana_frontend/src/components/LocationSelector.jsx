import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Search, X, ChevronDown, Loader } from 'lucide-react';

const QUICK_LOCATIONS = [
  { label: 'Connaught Place', pincode: '110001', city: 'New Delhi' },
  { label: 'Karol Bagh',      pincode: '110005', city: 'New Delhi' },
  { label: 'Lajpat Nagar',   pincode: '110024', city: 'New Delhi' },
  { label: 'Dwarka Sector 6', pincode: '110075', city: 'New Delhi' },
  { label: 'Noida Sector 18', pincode: '201301', city: 'Noida' },
  { label: 'Gurugram DLF',   pincode: '122002', city: 'Gurugram' },
];

const LocationSelector = () => {
  const [open, setOpen] = useState(false);
  const [pincodeInput, setPincodeInput] = useState('');
  const [locating, setLocating] = useState(false);
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('apnabazar_location');
    return saved ? JSON.parse(saved) : { label: 'Select Location', pincode: '', city: '' };
  });
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const saveLocation = (loc) => {
    setLocation(loc);
    localStorage.setItem('apnabazar_location', JSON.stringify(loc));
    setOpen(false);
    setError('');
    setPincodeInput('');
  };

  // Reverse geocode using free Nominatim API
  const reverseGeocode = async (lat, lon) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    const addr = data.address || {};
    const label = addr.suburb || addr.neighbourhood || addr.village || addr.town || addr.city || 'Your Location';
    const pincode = addr.postcode || '';
    const city = addr.city || addr.town || addr.county || '';
    return { label, pincode, city };
  };

  const detectLocation = () => {
    setError('');
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const loc = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
          saveLocation(loc);
        } catch {
          setError('Could not fetch address. Please enter pincode manually.');
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setError('Location access denied. Please enter your pincode below.');
      },
      { timeout: 10000 }
    );
  };

  const handlePincodeSubmit = async (e) => {
    e.preventDefault();
    const pin = pincodeInput.trim();
    if (!/^\d{6}$/.test(pin)) {
      setError('Please enter a valid 6-digit pincode.');
      return;
    }
    setLocating(true);
    setError('');
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${pin}&countrycodes=in&limit=1`);
      const data = await res.json();
      if (data && data[0]) {
        const loc = await reverseGeocode(data[0].lat, data[0].lon);
        saveLocation({ ...loc, pincode: pin });
      } else {
        setError('Pincode not found. Please try a different one.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLocating(false);
    }
  };

  const hasLocation = location.pincode || location.label !== 'Select Location';

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '7px 12px',
          background: 'var(--input-bg)',
          border: `1.5px solid ${open ? 'var(--primary)' : 'var(--border-color)'}`,
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          maxWidth: '220px',
          boxShadow: open ? '0 0 0 3px var(--primary-light)' : 'none',
        }}
      >
        <MapPin size={15} color="var(--primary)" strokeWidth={2.5} />
        <div style={{ textAlign: 'left', flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)', lineHeight: 1, marginBottom: '2px' }}>
            DELIVER TO
          </div>
          <div style={{
            fontSize: '13px',
            fontWeight: '800',
            color: 'var(--text-main)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '130px',
          }}>
            {hasLocation ? (location.pincode ? `${location.label} ${location.pincode}` : location.label) : 'Set location'}
          </div>
        </div>
        <ChevronDown size={14} color="var(--text-muted)" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease', flexShrink: 0 }} />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          left: 0,
          width: '320px',
          background: 'var(--card-bg)',
          border: '1.5px solid var(--border-color)',
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          zIndex: 9999,
          overflow: 'hidden',
          animation: 'modal-pop 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          {/* Header */}
          <div style={{ padding: '16px 18px 12px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: '900', color: 'var(--text-main)' }}>Choose Delivery Location</div>
            <button onClick={() => setOpen(false)} style={{ color: 'var(--text-muted)', display: 'flex', padding: '4px' }}>
              <X size={18} />
            </button>
          </div>

          {/* Detect My Location */}
          <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border-color)' }}>
            <button
              onClick={detectLocation}
              disabled={locating}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 14px',
                background: 'var(--primary-light)',
                border: '1.5px solid var(--primary)',
                borderRadius: '10px',
                cursor: locating ? 'wait' : 'pointer',
                transition: 'all 0.2s',
                color: 'var(--primary)',
                fontWeight: '700',
                fontSize: '14px',
              }}
            >
              {locating
                ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Detecting location...</>
                : <><Navigation size={18} /> Use my current location</>
              }
            </button>
            {error && (
              <div style={{ color: '#e23744', fontSize: '12px', fontWeight: '600', marginTop: '8px', padding: '0 4px' }}>
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Pincode Input */}
          <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Enter Pincode
            </div>
            <form onSubmit={handlePincodeSubmit} style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '10px' }} />
                <input
                  type="text"
                  maxLength={6}
                  inputMode="numeric"
                  placeholder="e.g. 110001"
                  value={pincodeInput}
                  onChange={e => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  style={{
                    width: '100%',
                    paddingLeft: '32px',
                    paddingRight: '12px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    border: '1.5px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: 'var(--input-bg)',
                    color: 'var(--text-main)',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>
              <button
                type="submit"
                disabled={locating || pincodeInput.length !== 6}
                style={{
                  padding: '10px 16px',
                  background: 'var(--primary)',
                  color: '#fff',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '14px',
                  cursor: pincodeInput.length === 6 ? 'pointer' : 'not-allowed',
                  opacity: pincodeInput.length === 6 ? 1 : 0.5,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  fontFamily: 'inherit',
                }}
              >
                Apply
              </button>
            </form>
          </div>

          {/* Quick Select */}
          <div style={{ padding: '12px 18px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              Popular Locations
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {QUICK_LOCATIONS.map(loc => (
                <button
                  key={loc.pincode}
                  onClick={() => saveLocation(loc)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '9px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                    background: location.pincode === loc.pincode ? 'var(--primary-light)' : 'transparent',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--input-bg)'}
                  onMouseLeave={e => e.currentTarget.style.background = location.pincode === loc.pincode ? 'var(--primary-light)' : 'transparent'}
                >
                  <MapPin size={15} color={location.pincode === loc.pincode ? 'var(--primary)' : 'var(--text-muted)'} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: location.pincode === loc.pincode ? 'var(--primary)' : 'var(--text-main)' }}>
                      {loc.label}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
                      {loc.city} — {loc.pincode}
                    </div>
                  </div>
                  {location.pincode === loc.pincode && (
                    <div style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Spinner keyframe */}
          <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
