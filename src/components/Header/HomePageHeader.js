import { useEffect, useState } from "react";
import {
  Form,
  Col,
  Row,
  ButtonGroup,
  ToggleButton,
  InputGroup,
  Button,
} from "react-bootstrap";
import "./HomePageHeader.css";
import axios from "axios";

function HomePageHeader({ apiUrl, filter, setFilter }) {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    try {
      const fetchCities = async () => {
        const response = await axios.get(apiUrl);
        response.data.forEach((property) => {
          if (cities.indexOf(property.city) < 0)
            setCities([...cities, property.city]);
          if (states.indexOf(property.state) < 0)
            setStates([...states, property.state]);
        });
      };
      fetchCities();
    } catch (e) {
      console.log(e);
    }
  }, [cities, states, apiUrl]);

  function handleChange(e) {
    if (e.target.type === 'checkbox') {
        setFilter({ ...filter, amenities: {...filter.amenities,[e.target.name]: e.target.checked }});
    }
    else {setFilter({ ...filter, [e.target.name]: e.target.value });}
    
  }

  function handleClear() {
    setFilter({
      city: "",
      state: "",
      transaction: "venda",
      bedrooms: "",
      bathrooms: "",
      minValue: "0",
      maxValue: "",

    });
  }

  return (
    <div className="hp-bg d-flex flex-column justify-content-center align-items-center">
      <section className="text-center">
        <h1> Iron House</h1>
        <h2> Assessoria Imobiliaria</h2>
      </section>

      <section className="filter-container">
        <div className="d-flex justify-content-between">
          <ButtonGroup className="mb-3 transaction-btn">
            <ToggleButton
              type="radio"
              id="radio-venda"
              htmlFor="radio-venda"
              variant="outline-primary"
              name="transaction"
              value="venda"
              checked={filter.transaction === "venda"}
              onChange={handleChange}
            >
              VENDA
            </ToggleButton>
            <ToggleButton
              type="radio"
              id="radio-aluguel"
              htmlFor="radio-aluguel"
              variant="outline-primary"
              name="transaction"
              value="aluguel"
              checked={filter.transaction === "aluguel"}
              onChange={handleChange}
            >
              ALUGUEL
            </ToggleButton>
          </ButtonGroup>

          <Button
            onClick={handleClear}
            className="clear-filter mb-3"
            variant="outline-primary"
          >
            LIMPAR FILTROS
          </Button>
        </div>
        <Form>
          <Row>
            <Col>
              <Form.Select
                onChange={handleChange}
                value={filter.type}
                name="type"
                className="select-filter"
                size="lg"
                aria-label="Default select example"
              >
                <option value=''>Tipo de imóvel</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="terreno">Terreno</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                onChange={handleChange}
                value={filter.state}
                name="state"
                className="select-filter"
                size="lg"
                aria-label="Default select example"
              >
                <option name="state" value=''>Estado</option>

                {states.map((state) => {
                  return (
                    <option key={state} name="state" value={state}>
                      {state}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                onChange={handleChange}
                value={filter.city}
                name="city"
                className="select-filter"
                size="lg"
                aria-label="Default select example"
              >
                <option name="city" value=''>Cidade</option>
                {cities.map((city) => {
                  return (
                    <option key={city} name="city" value={city}>
                      {city}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
          </Row>

          <Row>
            {/* FILTRO DE VALOR */}
            <Col className="col-3">
              <Form.Label htmlFor="min-value">Valor Mínimo</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  id="min-value"
                  name="minValue"
                  value={filter.minValue}
                  onChange={handleChange}
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col className="col-3">
              <Form.Label htmlFor="max-value">Valor Máximo</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  id="max-value"
                  name="maxValue"
                  type="number"
                  value={filter.maxValue}
                  onChange={handleChange}
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
            </Col>

            {/* FILTRO DE QUARTOS */}
            <Col className="d-flex flex-column align-items-center">
              <Form.Label>N° de quartos</Form.Label>
              <ButtonGroup className="">
                <ToggleButton
                  type="radio"
                  id="radio-1-bedrooms"
                  htmlFor="radio-1-bedrooms"
                  variant="outline-primary"
                  name="bedrooms"
                  value="1"
                  checked={filter.bedrooms === "1"}
                  onChange={handleChange}
                >
                  1
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-2-bedrooms"
                  htmlFor="radio-2-bedrooms"
                  variant="outline-primary"
                  name="bedrooms"
                  value="2"
                  checked={filter.bedrooms === "2"}
                  onChange={handleChange}
                >
                  2
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-3-bedrooms"
                  htmlFor="radio-3-bedrooms"
                  variant="outline-primary"
                  name="bedrooms"
                  value="3"
                  checked={filter.bedrooms === "3"}
                  onChange={handleChange}
                >
                  3
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-4-bedrooms"
                  htmlFor="radio-4-bedrooms"
                  variant="outline-primary"
                  name="bedrooms"
                  value="4"
                  checked={filter.bedrooms === "4"}
                  onChange={handleChange}
                >
                  4 +
                </ToggleButton>
              </ButtonGroup>
            </Col>
            {/* FILTRO DE BANHEIROS */}

            <Col className="d-flex flex-column align-items-center">
              <Form.Label>N° de banheiros</Form.Label>
              <ButtonGroup className="">
                <ToggleButton
                  type="radio"
                  id="radio-1-bathroom"
                  htmlFor="radio-1-bathroom"
                  variant="outline-primary"
                  name="bathrooms"
                  value="1"
                  checked={filter.bathrooms === "1"}
                  onChange={handleChange}
                >
                  1
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-2-bathrooms"
                  htmlFor="radio-2-bathrooms"
                  variant="outline-primary"
                  name="bathrooms"
                  value="2"
                  checked={filter.bathrooms === "2"}
                  onChange={handleChange}
                >
                  2
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-3-bathrooms"
                  htmlFor="radio-3-bathrooms"
                  variant="outline-primary"
                  name="bathrooms"
                  value="3"
                  checked={filter.bathrooms === "3"}
                  onChange={handleChange}
                >
                  3
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  id="radio-4-bathrooms"
                  htmlFor="radio-4-bathrooms"
                  variant="outline-primary"
                  name="bathrooms"
                  value="4"
                  checked={filter.bathrooms === "4"}
                  onChange={handleChange}
                >
                  4 +
                </ToggleButton>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col>
            <Form.Check
              type="switch"
              id="swimming"
              name="swimming"
              label="Piscina"
              checked={filter.amenities.swimming}
              onChange={handleChange}
            />
            </Col>
            <Col>
            <Form.Check
              type="switch"
              id="concierge"
              name="concierge"
              label="Concierge"
              checked={filter.amenities.concierge}
              onChange={handleChange}
            />
            </Col>
          
          <Col>
          <Form.Check
              type="switch"
              id="gourmet"
              name="gourmet"
              label="Espaço Gourmet"
              checked={filter.amenities.gourmet}
              onChange={handleChange}
            />
          </Col>
            <Col>
            <Form.Check
              type="switch"
              id="parking"
              name="parking"
              label="Estacionamento"
              checked={filter.amenities.parking}
              onChange={handleChange}
            />
            </Col>
            </Row>
        </Form>
      </section>
    </div>
  );
}

export default HomePageHeader;
